# This file is part of Share₂Fedi
# https://github.com/kytta/share2fedi
#
# SPDX-FileCopyrightText: © 2026 Nikita Karamov <me@kytta.dev>
# SPDX-License-Identifier: AGPL-3.0-only

FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN <<EOF
corepack enable
corepack prepare pnpm@latest-10 --activate
EOF

WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
ENV ASTRO_TELEMETRY_DISABLED=1
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f
RUN --mount=type=cache,id=apk,target=/var/cache/apk apk add --update-cache tini=0.19.0-r3
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["node", "/app/dist/server/entry.mjs"]
