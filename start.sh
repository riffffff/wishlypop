#!/bin/sh
set -e

echo "📦 Wishly Docker starting up..."
echo "NODE_ENV: ${NODE_ENV:-production}"
echo "DATABASE_URL: ${DATABASE_URL:-file:/app/data/wishly.db}"

# Ensure data and uploads directories exist and are writable
mkdir -p /app/data /app/public/uploads 2>/dev/null || true

if [ ! -w "/app/data" ]; then
  echo "⚠️  WARNING: /app/data is not writable by current user ($(id -u):$(id -g))."
  echo "   If using Docker volumes or bind mounts, ensure permissions are set to UID 1001 (nextjs)."
fi

echo ""
echo "🔧 Running Prisma schema sync (db push)..."
if command -v prisma >/dev/null 2>&1; then
  prisma db push --skip-generate
elif [ -f "./node_modules/.bin/prisma" ]; then
  ./node_modules/.bin/prisma db push --skip-generate
else
  npx prisma db push --skip-generate
fi

echo ""
echo "🚀 Starting Next.js server on 0.0.0.0:${PORT:-3000}..."
exec node server.js
