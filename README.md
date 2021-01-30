<h1 align="center"><img src="assets/logo.svg" width="128" height="128" alt="toot"></h1>

[`toot`][toot] is a share page for Mastodon, allowing you to share stuff cross-instance.
Just put in your post text and the instance URL and click "Toot!"

And if you open this page with `text` URL parameter, it will be auto-inserted in the
text field. Same goes for the `instance` URL parameter. This can be used to build
custom share buttons for Mastodon:

```html
<a href="https://toot.karamoff.dev/?text=Hello%20world&instance=https%3A%2F%2Fmastodon.xyz">
  Share on Mastodon  
</a>
```

The instance URL can be saved in your localStorage to be automatically appended later —
handy!

## License

[AGPL-3.0](./LICENSE) © 2020-2021 [Nikita Karamov](nick@karamoff.dev)

The `toot` logo is based on Mastodon's "Simple" logo, licensed under [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html).

The repo banner includes Mastodon's "Full" logo, licensed under [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html).

----

[![Powered by Vercel](https://badgen.net/badge/powered%20by/vercel/black)](https://vercel.com)

[toot]: https://toot.karamoff.dev
