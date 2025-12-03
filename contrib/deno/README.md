<!--
This file is part of Share₂Fedi
https://github.com/kytta/share2fedi

SPDX-FileCopyrightText: © 2025 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

# Deploy using Deno

> [!WARNING]
> This runtime is no longer officially supported. The guide listed here was written for Share₂Fedi v3.4.0 and may become out of date.

To deploy Share₂Fedi to Deno, you should use the [official adapter](https://github.com/denoland/deno-astro-adapter).

1. Install Deno adapter:

   ```sh
   pnpm add -D @deno/astro-adapter@^0.2.1
   ```

   > **Note:**
   > At the time of writing this guide, Deno Astro adapter v0.3 does not work with Share₂Fedi

2. Enable adapter in astro.config.ts:

   ```diff
   -import node from "@astrojs/node";
   +import deno from "@deno/astro-adapter";

    export default defineConfig({
   -    adapter: node({ mode: "standalone" }),
   +    adapter: deno(),
    });
   ```

3. (optional) Uninstall the Node.js adapter

   ```sh
   pnpm remove @astrojs/node
   ```

4. Build project as usual

   ```sh
   pnpm run build
   ```

5. Run or deploy project

   ```sh
   deno run --allow-net --allow-read --allow-env ./dist/server/entry.mjs
   ```

   ```sh
   cd dist  # to not upload unneeded files
   deployctl deploy --entrypoint server/entry.mjs
   ```
