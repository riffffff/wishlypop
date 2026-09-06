#!/usr/bin/env bash
# ============================================================
# Wishly — Remote Deployment Script (dijalankan di VPS server)
# Dipanggil otomatis oleh GitHub Actions CD workflow via SSH
# ============================================================
set -euo pipefail

APP_DIR="${WISHLY_APP_DIR:-$HOME/wishly}"
APP_NAME="wishly"
COMPOSE_FILE="docker-compose.yml"

echo ""
echo "🚀 =============================================="
echo "🚀 Wishly Remote Deployment Started"
echo "🚀 =============================================="
echo "📍 Working directory : $APP_DIR"
echo "🕒 Timestamp         : $(date)"
echo ""

cd "$APP_DIR"

# -------- Step 1: Pull source terbaru --------
echo "1️⃣  [1/6] Pull latest source dari git..."
if [ -d .git ]; then
  git fetch --all --prune
  git reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null
  echo "     ✅ Source code updated to latest HEAD"
else
  echo "     ⚠️  Bukan git repo, assume source sudah disync terlebih dahulu"
fi
echo ""

# -------- Step 2: Pastikan .env ada --------
echo "2️⃣  [2/6] Check environment file..."
if [ ! -f .env ]; then
  echo "     ❌ .env tidak ditemukan di $APP_DIR!"
  echo "     Copy .env.example -> .env dan isikan dulu secrets."
  exit 1
fi
echo "     ✅ .env ditemukan"
echo ""

# -------- Step 3: Build image terbaru --------
echo "3️⃣  [3/6] Build Docker image terbaru (--no-cache optional)..."
docker compose -f "$COMPOSE_FILE" build
echo "     ✅ Build selesai"
echo ""

# -------- Step 4: Up container (zero-ish downtime) --------
echo "4️⃣  [4/6] Deploy container baru..."
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans
echo "     ✅ Container up and running"
echo ""

# -------- Step 5: Healthcheck --------
echo "5️⃣  [5/6] Menunggu server siap & healthcheck..."
MAX_RETRIES=15
RETRY=0
SLEEP_SEC=4
HEALTH_URL="http://127.0.0.1:3000"
while [ $RETRY -lt $MAX_RETRIES ]; do
  if curl -fsS "$HEALTH_URL" >/dev/null 2>&1; then
    echo "     ✅ Server sehat! (menghasilkan response 200 di $HEALTH_URL)"
    break
  fi
  RETRY=$((RETRY + 1))
  echo "     ⏳  Attempt $RETRY/$MAX_RETRIES — belum siap, cek lagi ${SLEEP_SEC}s..."
  sleep $SLEEP_SEC
done
if [ $RETRY -ge $MAX_RETRIES ]; then
  echo ""
  echo "     ❌ Healthcheck gagal setelah $MAX_RETRIES percobaan!"
  echo "     Container logs 50 baris terakhir:"
  docker compose logs --tail=50 || true
  exit 1
fi
echo ""

# -------- Step 6: Prune images lama --------
echo "6️⃣  [6/6] Membersihkan image lama..."
docker image prune -af --filter "label!=keep" >/dev/null 2>&1 || true
echo "     ✅ Selesai"
echo ""

# -------- Done --------
CONTAINER_STATUS=$(docker compose ps --format json 2>/dev/null | head -1 || echo "{}")
echo "✅ =============================================="
echo "✅ 🎉 Deployment Sukses!"
echo "✅ =============================================="
echo "📦 Container : $(docker compose ps --format '{{.Name}} — {{.State}} — {{.Ports}}' 2>/dev/null || echo wishly-app)"
echo "🌐 Akses     : http://$(hostname -I | awk '{print $1}'):3000"
echo "🕒 Selesai   : $(date)"
echo ""
