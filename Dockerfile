FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# NEXT_PUBLIC_* vars must be present at build time for Next.js to inline them.
# Render sets these as build-time env vars in the dashboard.
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Next.js standalone output bundles everything needed into .next/standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Render injects PORT; default to 3000 for local Docker / docker-compose.
ENV PORT=3000
EXPOSE 3000

# Shell form so $PORT is interpolated at runtime
CMD node server.js

