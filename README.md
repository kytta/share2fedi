<h1 align="center"><img src="assets/share2fedi.svg" width="520" height="160" alt="Share2Fedi"></h1>

> Instance-agnostic share page for the Fediverse.

**[Share₂Fedi]** allows you to share stuff on Mastodon, GoToSocial, Pleroma, and
other federated social networks, instance-agnostic. Just type in the post text
and the instance URL, and click ‘Post!’

Or, open this page with the prefilled `text` URL parameter—it will be
automatically inserted into the text field. The same goes for the `instance` URL
parameter. This can be used to build custom share buttons for the federated
social networks:

```html
<a
  href="https://s2f.kytta.dev/?text=Hello%20world!&instance=https%3A%2F%2Fmastodon.xyz"
>
  Share on mastodon.xyz
</a>
```

The instance URL can be saved in your `localStorage` to be automatically
appended if used later—handy!

## Hosting

### One-click Vercel deploy

**Share₂Fedi** is designed to run on [Vercel](https://vercel.com/). To deploy it
yourself (it's free!), you can use the following button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkytta%2Fshare2fedi)

### Host it yourself

Self-hosting **Share₂Fedi** outside of Vercel requires some extra setup:

**Prerequisites:** modern Node.js (v16 or later), `pnpm`.

1. Install dependencies.

   ```sh
   pnpm install
   ```

2. Build.

   ```sh
   pnpm build
   ```

3. Run server.

   > By default, this will only listen on localhost port 3000. To enable
   > listening on a ceratin hostand/or port, set the `HOST` and `PORT`
   > environment variables, respectively.

   ```sh
   node dist/server/entry.mjs
   ```

   alternatively, if you want to run the process in the background:

   ```sh
   pm2 start dist/server/entry.mjs --watch --ignore-watch="node_modules"
   ```

   > You can find a summary for pm2 at:
   > https://pm2.keymetrics.io/docs/usage/quick-start/

   > More information about self-hosting an Astro website with Node:
   > https://docs.astro.build/en/guides/integrations-guide/node/#standalone

4. Set up a reverse proxy.

   Basically, you need to run a reverse proxy that would redirect all incoming
   requests to `localhost:3000`. Here's how to achieve this in various HTTP
   servers:

   1. Apache

   ```apacheconf
   ProxyPass "/" "http://localhost:3000/"
   ```

   2. Nginx

   ```nginxconf
   location / {
       proxy_pass http://localhost:3000/;
   }
   ```

   3. Caddy

   ```caddy
   reverse_proxy :3000
   ```

## See also

**[📯 Shareon](https://shareon.js.org)** (lightweight, stylish, and ethical
share buttons) uses **Share₂Fedi** under the hood!

## Licence

© 2020–2022 [Nikita Karamov]\
Licensed under the [GNU Affero General Public License, version 3][AGPL-3.0].

---

This project is hosted on GitHub: <https://github.com/kytta/share2fedi.git>

[AGPL-3.0]: https://spdx.org/licenses/AGPL-3.0-only.html
[Nikita Karamov]: https://www.kytta.dev
[Share₂Fedi]: https://s2f.kytta.dev/
