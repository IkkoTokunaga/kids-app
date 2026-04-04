#!/bin/sh
set -e
# 匿名ボリュームの .next / node_modules は root 所有になりやすい。
# 公式 node イメージの node ユーザー (uid 1000) で実行し、ホスト bind mount の
# ファイル所有者と揃えて next-env.d.ts 等の更新も可能にする。
if [ "$(id -u)" = "0" ]; then
  mkdir -p /app/.next
  chown -R node:node /app/.next
  chown -R node:node /app/node_modules 2>/dev/null || true
  exec runuser -u node -- "$@"
fi
exec "$@"
