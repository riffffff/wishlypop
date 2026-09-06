# ==============================================================
# WISHLY — Step-by-Step Deploy Production
# Domain: wishlypop.com
# ==============================================================

# ==============================================================
# 0️⃣ PRASYARAT (1x aja)
# ==============================================================
# Sebelum mulai, pastikan kamu punya:
#   • VPS (Ubuntu 22.04 / Debian 12) — minimal 1 vCPU 1GB RAM OK
#   • Akses SSH ke VPS
#   • Domain wishlypop.com (sudah beli)
# ==============================================================


# ==============================================================
# 1️⃣ SETTING DNS RECORD (di Namecheap / Cloudflare / wherever)
# ==============================================================
# Buka dashboard DNS provider kamu, buat 2 record ini:
#
# TIPE   NAMA (@)      ISI (Value)                 TTL
# A      @             <IP_PUBLIK_VPS_KAMU>        300 / Auto
# A      www           <IP_PUBLIK_VPS_KAMU>        300 / Auto
#
# (Ganti <IP_PUBLIK_VPS_KAMU> dengan IP VPS mu, misal 103.123.45.67)
#
# Cek sudah propagasi (bisa 1-10 menit) buka:
#   https://dnschecker.org/#A/wishlypop.com
# ==============================================================


# ==============================================================
# 2️⃣ INSTALL DEPENDENSI DI VPS (1x aja)
# ==============================================================
ssh root@wishlypop.com        # atau ssh ubuntu@wishlypop.com

# --- Update OS ---
sudo apt update -y && sudo apt upgrade -y

# --- Install Docker + Docker Compose ---
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# LOGOUT SSH dulu, LOGIN LAGI agar group docker apply
exit
ssh root@wishlypop.com
docker ps   # pastikan tidak error permission denied

# --- Install Caddy (reverse proxy + auto SSL) ---
# Pilih OPSI A (Caddy — PALING MUDAH, auto SSL) ATAU OPSI B (Nginx)

# ---------- OPSI A: CADDY (REKOMENDASI) ----------
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy

# ---------- OPSI B: NGINX + CERTBOT ----------
# sudo apt install -y nginx certbot python3-certbot-nginx


# ==============================================================
# 3️⃣ PUSH CODE KE GITHUB + SETUP SECRETS
# ==============================================================
# (laptop kamu)
cd ~/project/wishly
git init 2>/dev/null || true
git add .
git commit -m "chore: init wishly v1"
git branch -M main
# Buat repo kosong di GitHub, copy URL nya
git remote add origin git@github.com:<USERNAME_GITHUB>/wishlypop.git
git push -u origin main

# --- Setup GitHub Secrets (di repo → Settings → Secrets and variables → Actions):
#
#   SECRET NAME              ISI CONTOH
#   ──────────────────────────────────────────────────────────────────
#   VPS_HOST                 wishlypop.com
#   VPS_USER                 root     (atau ubuntu / user kamu)
#   VPS_SSH_KEY              <isi ~/.ssh/id_ed25519  dari laptop kamu>
#   NEXT_PUBLIC_APP_URL      https://wishlypop.com
#   LEMON_SQUEEZY_API_KEY    <dari LS dashboard>
#   LEMON_SQUEEZY_STORE_ID   <dari LS dashboard>
#   LEMON_SQUEEZY_VARIANT_ID <dari LS dashboard>
#   LEMON_SQUEEZY_WEBHOOK_SECRET <dari LS webhooks>
#   RESEND_API_KEY           <dari resend.com>
#
# SSH KEY:
#   # generate di laptop jika belum
#   ssh-keygen -t ed25519 -C "github-cicd@wishlypop" -f ~/.ssh/wishly_cicd
#   # copy public key ke VPS:
#   ssh-copy-id -i ~/.ssh/wishly_cicd.pub root@wishlypop.com
#   # copy ISI PRIVATE KEY ke GitHub Secret VPS_SSH_KEY:
#   cat ~/.ssh/wishly_cicd
# ==============================================================


# ==============================================================
# 4️⃣ SETUP REVERSE PROXY (PILIH OPSI A ATAU B)
# ==============================================================
# ---------- OPSI A: CADDY (REKOMENDASI) ----------
# Di VPS, copy file Caddyfile:
sudo nano /etc/caddy/Caddyfile
# Copy paste ISI dari deploy/Caddyfile di project ini
# Simpan Ctrl+O, keluar Ctrl+X
sudo systemctl enable --now caddy
sudo systemctl restart caddy

# ---------- OPSI B: NGINX ----------
# sudo nano /etc/nginx/sites-available/wishlypop
# (copy isi deploy/nginx-wishlypop.conf dari project)
# sudo ln -sf /etc/nginx/sites-available/wishlypop /etc/nginx/sites-enabled/
# sudo nginx -t    # pastikan sukses
# sudo systemctl restart nginx
# sudo certbot --nginx -d wishlypop.com -d www.wishlypop.com --redirect -m email@kamu.com --agree-tos --no-eff-email


# ==============================================================
# 5️⃣ DEPLOY PERTAMA (BISA OTOMATIS LEWAT CI/CD ATAU MANUAL)
# ==============================================================
# --- Cara 1: OTOMATIS (setelah setup secrets jalan otomatis) ---
# Cukup push commit baru ke main:
cd ~/project/wishly && git commit --allow-empty -m "🚀 Trigger first deploy" && git push
# Buka GitHub repo → Actions → lihat pipeline jalan!

# --- Cara 2: MANUAL (lebih cepat cek jalan atau tidak) ---
ssh root@wishlypop.com
mkdir -p ~/wishly && cd ~/wishly
# Di laptop, upload project:
# (laptop): scp -r ./wishly root@wishlypop.com:/root/

# Di VPS:
cd ~/wishly
cp .env.example .env
nano .env   # isi LEMON_SQUEEZY dkk
chmod +x scripts/deploy.sh start.sh
./scripts/deploy.sh   # build docker + up + healthcheck

# Coba buka: curl http://localhost:3000  # harus kembalikan HTML 200 OK


# ==============================================================
# 6️⃣ SETUP LEMON SQUEEZY WEBHOOK
# ==============================================================
# Buka https://app.lemonsqueezy.com/settings/webhooks
#   • Webhook URL:  https://wishlypop.com/api/webhook/lemon-squeezy
#   • Signing Secret: copy ke GitHub Secret LEMON_SQUEEZY_WEBHOOK_SECRET
#   • Events: centang ORDER_CREATED + ORDER_PAYMENT_SUCCESS
# Save

# Test webhook: Lemon Squeezy → Test mode → Create test order


# ==============================================================
# 7️⃣ SETUP RESEND EMAIL
# ==============================================================
# Buka https://resend.com → API Keys → Create API Key
# Copy ke GitHub Secret RESEND_API_KEY

# Jangan lupa verify DNS domain wishlypop.com di Resend agar email tidak SPAM:
#   Resend → Domains → Add Domain: wishlypop.com
#   Tambahkan 3 record TXT/MX/CNAME ke DNS panel kamu
#   Klik Verify sampai status ✅ Verified


# ==============================================================
# 8️⃣ VERIFIKASI SEMUA BERJALAN
# ==============================================================
# Buka browser:
#   ✅ https://wishlypop.com          → Landing page Wishly (HTTPS Gembira)
#   ✅ https://www.wishlypop.com      → Redirect ke https://wishlypop.com
#   ✅ https://wishlypop.com/create   → Editor terbuka
#   ✅ Buat kartu → Preview → Klik Kirim → Lemon Squeezy checkout load
#   ✅ Test payment (Lemon Squeezy Test mode)
#   ✅ Link kartu dikirim ke email (Resend)
#   ✅ Buka /c/[cardId] → animasi buka amplop berjalan


# ==============================================================
# 🛠️ PERINTAH UMUM DI VPS (untuk debugging, nanti ke depannya)
# ==============================================================
cd ~/wishly

# Status container
docker compose ps

# Log realtime (bila error baca ini):
docker compose logs -f --tail=100

# Restart app (misal ganti env):
docker compose restart

# Stop app:
docker compose down

# Start app:
docker compose up -d

# Build ulang (jika ada perubahan kode):
docker compose up -d --build

# Backup database SQLite (PENTING! Backup rutin):
mkdir -p ~/backup
docker cp wishly-app:/app/data/wishly.db ~/backup/wishly-$(date +%Y%m%d_%H%M).db

# Cleanup image lama (hemat disk):
docker system prune -af
