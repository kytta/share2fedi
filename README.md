<h1 align="center"><img src="assets/logo.svg" width="128" height="128" alt="toot"></h1>

> Cross-instance share page for Mastodon

[toot] allows you to share stuff on Mastodon, cross-instance. Just put in your post text and the instance URL and click ‘Toot!’

And if you open this page with `text` URL parameter, it will be auto-inserted in the text field. The same goes for the `instance` URL parameter. This can be used to build custom share buttons for Mastodon:

```html
<a href="https://toot.kytta.dev/?text=Hello%20world!&instance=https%3A%2F%2Fmastodon.xyz">
  Share on Mastodon
</a>
```

The instance URL can be saved in your `localStorage` to be automatically appended later — handy!

## Hosting

### One-click Vercel deploy

For now, toot is a tad bit vendor-locked to run on
[Vercel](https://vercel.com/). To deploy it yourself, you can use the following
button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNickKaramoff%2Ftoot)

### Host it yourself

Self-hosting toot outside of Vercel requires some extra setup:

1. Make sure you have got Node.js v12 or later installed

2. Build the static part of toot:

   ```sh
   yarn        # to install dependencies
   yarn build  # to build the website
   ```

3. Run the backend server for the form:

   ```sh
   node api/toot.js
   ```

4. Set up a reverse proxy from `localhost:8000` to `/api/toot`


## See also

**[📯 shareon](https://shareon.js.org)** — lightweight, stylish and ethical share buttons — use [toot] under the hood!

## Licence

[AGPL-3.0](https://spdx.org/licenses/AGPL-3.0-only.html) © 2020-2021, Nikita Karamov

The ‘toot’ logo is based on Mastodon’s ‘Simple’ logo, licensed under [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html).

The repo banner includes Mastodon’s ‘Full’ logo, licensed under [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html).

----

The source code is being hosted
on [GitHub](https://github.com/NickKaramoff/toot), with mirrors
on [GitLab](https://gitlab.com/kytta/toot)
and [Codeberg](https://codeberg.org/kytta/toot).

[toot]: https://toot.kytta.dev
