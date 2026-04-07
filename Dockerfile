# syntax=docker/dockerfile:1

# ==========================================================
# マルチステージビルド Dockerfile
# Base : Node.js 22-slim
# 非ルートユーザー (nextjs:nodejs) で実行 — 最小権限の原則
# ==========================================================

# ----------------------------------------------------------
# base: 全ステージ共通の土台
# ----------------------------------------------------------
FROM node:22-slim AS base
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    NPM_CONFIG_UPDATE_NOTIFIER=false

# 非ルートユーザーを作成
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# ----------------------------------------------------------
# development: ホットリロード付き開発環境
# 実行ユーザーは公式イメージの node (uid 1000)。ホストの bind mount と所有者が
# 揃いやすく、next-env.d.ts の自動更新も権限エラーにならない。
# 匿名ボリュームは entrypoint で node に chown。
# ----------------------------------------------------------
FROM base AS development
ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

COPY . .
COPY docker-entrypoint-dev.sh /docker-entrypoint-dev.sh
RUN chown -R node:node /app \
    && chmod +x /docker-entrypoint-dev.sh

USER root
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint-dev.sh"]
CMD ["npm", "run", "dev"]

# ----------------------------------------------------------
# builder: 本番ビルド用
# npm ci は devDependencies 必須（Tailwind v4 / @tailwindcss/postcss 等）
# NODE_ENV=production のまま ci すると dev が省略され next build が失敗する
# ----------------------------------------------------------
FROM base AS builder
COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

# ----------------------------------------------------------
# production: 最小フットプリントの本番イメージ
# standalone モードの成果物のみ収録
# ----------------------------------------------------------
FROM base AS production
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# standalone ビルド成果物をコピー（不要ファイルを含まない）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
