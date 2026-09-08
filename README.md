<!--
This README is part of Share₂Fedi
https://github.com/kytta/share2fedi

SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

<h1 align="center"><img src="assets/share2fedi.svg" width="520" height="160" alt="Share2Fedi"></h1>

> Instance-agnostic share page for the Fediverse.

**[Share₂Fedi]** (pronounced ‘share-to-fedi’) lets you share stuff on
Mastodon, Misskey, Friendica, and other federated social networks,
instance-agnostic. Just type in the post text and the instance URL, and click
‘Post’!

Or, add `text` query parameter to the UR, and it will be
automatically inserted into the text field. The same goes for the `instance` and
`lang` URL parameters. This can be used to build custom share buttons for the
federated social networks:

```html
<a href="https://s2f.kytta.dev/?text=Hello%20world!&instance=mastodon.xyz">
  Share on mastodon.xyz
</a>
```

The instance URL can be saved (this uses Local Storage) for later use.

> [!IMPORTANT]  
> I know I provide [a Share₂Fedi instance](https://s2f.kytta.dev) for others to
> use, but if you want to use Share₂Fedi for your share buttons, **please
> consider self-hosting it**. Although it's free now, running my instance may
> become too expensive for me in the future.

## Self-hosting

> [!NOTE]  
> Share₂Fedi is currently undergoing some transitions in regards to deployment.
> The steps below are not yet stable. This will be fixed in v4.

### Prerequisites

Before you start, you need to [request an API key](https://fediverse.observer/apikey)
from fediverse.observer. This is needed for the `/api/instances` endpoint that
returns 200 popular supported Fediverse instances. It is also used for
autosuggestions in the instance selector.

Expose the API key in an environment variable named `FEDIVERSE_OBSERVER_API_KEY`.
You can also use a .env file:

```ini
FEDIVERSE_OBSERVER_API_KEY=key-you-got-via-email
```

If you don't use an API key, the endpoint will still work, but slower and more
flaky.

### Docker

Share₂Fedi has an official container image that you can use with any OCI runner.
For example, using Podman:

```sh
podman run --detach --publish 127.0.0.1:9999:3000/tcp ghcr.io/kytta/share2fedi:v4.0.0-alpha.8
```

You can pull the image from:

- Docker Hub: `kytta/share2fedi`
- GHCR: `ghcr.io/kytta/share2fedi`
- Quay: `quay.io/kytta/share2fedi`

The app runs on port 3000, which the container automatically exposes. In above
code, port 9999 is used on host machine.

Same configuration as a Compose file:

```yaml
services:
  share2fedi:
    image: ghcr.io/kytta/share2fedi:v4.0.0-alpha.8
    ports:
      - "127.0.0.1:9999:3000/tcp"
```

The app does not do any TLS termination, so you **must** run it behind a reverse
proxy to get HTTPS. We won't go into detail here; you probably know what you're
doing.

Apart from versioned tags, there is also the `edge` tag, which is built from the
latest commit on the main branch. It is _not recommended_ to use it, as it might
contain bugs.

### Bare metal

You can also host Share₂Fedi without Docker, but this requires some extra setup.

**Prerequisites:** Node.js v24, `pnpm`.

0. Clone the repository on the target machine, or download it as a tarball.

1. Install dependencies.

   ```sh
   pnpm install
   ```

2. Build.

   ```sh
   pnpm build
   ```

3. Run server.

   > By default, this will only listen on `localhost:3000`. To enable
   > listening on a certain host and/or port, set the `HOST` and `PORT`
   > environment variables, respectively.

   ```sh
   node dist/server/entry.mjs
   ```

   In production, you might want to use a process manager, like
   [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/):

   ```sh
   # Start the app, restart on file changes (except node_modules)
   pm2 start dist/server/entry.mjs --name "Share2Fedi" --watch --ignore-watch="node_modules"
   ```

   > More information about self-hosting an Astro website with Node:
   > https://docs.astro.build/en/guides/integrations-guide/node/#standalone

## Contribute

### Source code

TL;DR: `pnpm install && pnpm dev`

See [contributing guide](CONTRIBUTING.md#improving-code) for instructions on how
to contribute source code to the project, including adding new Fediverse
projects.

### Translations

Share₂Fedi uses Hosted Weblate for translations.
[You can edit translations using its UI.](https://hosted.weblate.org/engage/share2fedi/).
You also could do it manually by editing files in `src/i18n/translations`, but
this is NOT recommended.

<a href="https://hosted.weblate.org/engage/share2fedi/">
<img src="https://hosted.weblate.org/widget/share2fedi/site/multi-auto.svg" alt="Translation status" />
</a>

> [!NOTE]
> New languages do not become automatically available. For this, a
> separate change to our ad-hoc i18n engine has to be made. See
> [contributing guide](CONTRIBUTING.md#translating) for instructions

_We thank Weblate for providing Libre hosting!_

## See also

**[📯 Shareon](https://shareon.js.org)** (lightweight, stylish, and ethical
share buttons) uses **Share₂Fedi** under the hood!

## Licence

© 2020 [Nikita Karamov]\
Licensed under the [GNU Affero General Public License v3.0 only][AGPL-3.0-only].

---

This project is hosted on GitHub: <https://github.com/kytta/share2fedi.git>

[AGPL-3.0-only]: https://spdx.org/licenses/AGPL-3.0-only.html
[Nikita Karamov]: https://www.kytta.dev
[Share₂Fedi]: https://s2f.kytta.dev/
