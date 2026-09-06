FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl wget curl
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build Next.js application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

# Stage 3: Production runner
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install Prisma CLI globally in runner for instant, offline schema migrations
RUN npm install -g prisma@6.19.3

# Create necessary runtime directories and set ownership
RUN mkdir -p /app/data /app/public/uploads && \
    chown -R nextjs:nodejs /app/data /app/public

# Copy Next.js standalone build & static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy prisma schema for runtime schema sync
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copy and setup start script
COPY --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh
RUN chmod +x /app/start.sh

USER nextjs

EXPOSE 3000

ENV DATABASE_URL=file:/app/data/wishly.db

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ || exit 1

CMD ["/app/start.sh"]