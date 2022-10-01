# Install dependencies only when needed
FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile



ENV NEXT_TELEMETRY_DISABLED 1

# Add `ARG` instructions below if you need `NEXT_PUBLIC_` variables
# then put the value on your fly.toml
# Example:
# NEXT_PUBLIC_API_URL=https://api.example.com

RUN yarn build



# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

USER nextjs

ENV PORT 3000

CMD ["/bin/sh", "startup.sh"]

# If using npm comment out above and use below instead
# CMD ["npm", "run", "start"]
