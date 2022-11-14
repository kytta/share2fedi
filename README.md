<h1 align="center"><img src="assets/share2fedi.svg" width="520" height="160" alt="Share2Fedi"></h1>

> Instance-agnostic share page for the Fediverse.

**[Share₂Fedi]** allows you to share stuff on Mastodon, GoToSocial, Pleroma, and other federated social networks, instance-agnostic. Just type in the post text and the instance URL, and click ‘Post!’

Or, open this page with the prefilled `text` URL parameter—it will be automatically inserted into the text field. The same goes for the `instance` URL parameter. This can be used to build custom share buttons for the federated social networks:

```html
<a href="https://s2f.kytta.dev/?text=Hello%20world!&instance=https%3A%2F%2Fmastodon.xyz">
  Share on mastodon.xyz
</a>
```

The instance URL can be saved in your `localStorage` to be automatically appended if used later—handy!

## Hosting

### One-click Vercel deploy

For now, **Share₂Fedi** is vendor-locked to run on [Vercel](https://vercel.com/). To deploy it yourself, you can use the following button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkytta%2Ftoot)

<!-- TODO: update the selfhosting instructions -->
<!-- 
### Host it yourself

Self-hosting **Share₂Fedi** outside of Vercel requires some extra setup:

1. Make sure you have got Node.js v12 or later as well as pnpm installed

2. Build the static part of toot:

   ```sh
   pnpm install    # to install dependencies
   pnpm run build  # to build the website
   ```

3. Run the backend server for the form:

   ```sh
   node api/toot.js
   ```

   or if you want to run the process in the background:

   ```sh
   pm2 start api/toot.js --watch --ignore-watch="node_modules"
   ```

   > You can find a summary for pm2 at: https://pm2.keymetrics.io/docs/usage/quick-start/

4. Set up webserver

   1. Apache

   ```apacheconf
   DocumentRoot "path_to_toot/public"

   ProxyPass "/api/toot"  "http://localhost:8000/"
   ```

   2. Nginx

   ```nginxconf
   root path_to_toot/public;
   index.html;

   location /api/toot {
       proxy_pass http://localhost:8000/;
   }
   ```

   3. Caddy

   ```caddy
   root * path_to_toot/public;
   try_files index.html

   handle_path /api/toot {
      reverse_proxy localhost:8000
   }
   ```
-->

## See also

**[📯 Shareon](https://shareon.js.org)**
(lightweight, stylish, and ethical share buttons) uses **Share₂Fedi** under the hood!

## Licence

© 2020–2022 [Nikita Karamov]\
Licensed under the [ISC License][ISC].

The repo banner includes Mastodon’s ‘Full’ logo, licensed under [AGPL-3.0].

---

This project is hosted on Codeberg: <https://codeberg.org/kytta/toot.git>

[AGPL-3.0]: https://spdx.org/licenses/AGPL-3.0-only.html
[ISC]: https://spdx.org/licenses/ISC.html
[Nikita Karamov]: https://www.kytta.dev
[Share₂Fedi]: https://s2f.kytta.dev/
