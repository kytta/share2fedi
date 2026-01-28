<!--
SPDX-FileCopyrightText: © 2026 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

# Deploy using Netlify

> [!WARNING]
> This runtime is no longer officially supported. The guide listed here was written for Share₂Fedi v3.4.0 and may become out of date.

To deploy Share₂Fedi to Netlify, you should use the [official adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/).

1. Install Netlify adapter:

   ```sh
   pnpm add -D @astrojs/netlify
   ```

2. Enable adapter in astro.config.ts:

   ```diff
   -import node from "@astrojs/node";
   +import netlify from "@astrojs/netlify";

    export default defineConfig({
   -    adapter: node({ mode: "standalone" }),
   +    adapter: netlify(),
    });
   ```

3. (optional) Uninstall the Node.js adapter

   ```sh
   pnpm remove @astrojs/node
   ```

4. Add [netlify.toml](./netlify.toml) to the project's root.

5. Run or deploy project

   Using Netlify CLI:

   ```sh
   # local development
   netlify dev
   ```

   ```sh
   # deploy
   netlify deploy
   ```
