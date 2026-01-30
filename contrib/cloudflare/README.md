<!--
SPDX-FileCopyrightText: © 2026 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

# Deploy using Cloudflare Pages / Workers

> [!WARNING]
> This runtime is no longer officially supported. The guide listed here was written for Share₂Fedi v3.4.0 and may become out of date.

To deploy Share₂Fedi to Cloudflare, you should use the [official adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/).

1. Install Cloudflare adapter:

   ```sh
   pnpm add -D @astrojs/cloudflare
   ```

2. Enable adapter in astro.config.ts:

   ```diff
   -import node from "@astrojs/node";
   +import cloudflare from "@astrojs/cloudflare";

    export default defineConfig({
   -    adapter: node({ mode: "standalone" }),
   +    adapter: cloudflare(),
    });
   ```

3. (optional) Uninstall the Node.js adapter

   ```sh
   pnpm remove @astrojs/node
   ```

4. Run or deploy project

   Using Wrangler:

   ```sh
   # local development
   wrangler dev
   ```

   ```sh
   # deploy
   wrangler deploy
   ```
