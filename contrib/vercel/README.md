<!--
SPDX-FileCopyrightText: © 2026 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

# Deploy using Vercel

> [!WARNING]
> This runtime is no longer officially supported. The guide listed here was written for Share₂Fedi v3.4.0 and may become out of date.

To deploy Share₂Fedi to Vercel, you should use the [official adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/).

1. Install Netlify adapter:

   ```sh
   pnpm add -D @astrojs/vercel
   ```

2. Enable adapter in astro.config.ts:

   ```diff
   -import node from "@astrojs/node";
   +import vercel from "@astrojs/vercel";

    export default defineConfig({
   -    adapter: node({ mode: "standalone" }),
   +    adapter: vercel(),
    });
   ```

3. (optional) Uninstall the Node.js adapter

   ```sh
   pnpm remove @astrojs/node
   ```

4. Add [vercel.json](./vercel.json) to the project's root.

5. Run or deploy project

   Using Vercel CLI:

   ```sh
   # local development
   vercel dev
   ```

   ```sh
   # deploy
   vercel deploy
   ```
