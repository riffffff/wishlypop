#!/bin/sh
set -e

echo "📦 Wishly Docker starting up..."
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL: $DATABASE_URL"

echo ""
echo "🔧 Running Prisma schema sync (db push)..."
npx prisma db push 

echo ""
echo "🚀 Starting Next.js server on 0.0.0.0:${PORT:-3000}..."
exec node server.js
