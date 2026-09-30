# This file is part of Share₂Fedi
# https://github.com/kytta/share2fedi
#
# SPDX-FileCopyrightText: © 2026 Nikita Karamov <me@kytta.dev>
# SPDX-License-Identifier: AGPL-3.0-only

FROM ghcr.io/pnpm/pnpm:12.8.2@sha256:68daf29be83708810af256844a2e5e93cbe3abcd3a2d08587ac393add65aea46 AS base
ENV PNPM_STORE_DIR=/pnpm/store

# renovate: datasource=node-version packageName=node versioning=node
ARG NODE_VERSION=24.20.0

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm runtime set node ${NODE_VERSION} -g

WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --libc musl

FROM base AS build
ENV ASTRO_TELEMETRY_DISABLED=1
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:24.20.0-alpine@sha256:e67514e5d0f6c46656005e1b693b2ec9d52e80b641307de684d4a015ba7a4eaf

# renovate: datasource=npm packageName=pm2
ARG PM2_VERSION=7.0.4

RUN --mount=type=cache,target=/root/.npm npm install -g pm2@${PM2_VERSION}
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV PM2_INSTANCES=1
EXPOSE 3000

CMD ["sh", "-c", "exec pm2-runtime -i \"$PM2_INSTANCES\" /app/dist/server/entry.mjs"]
