# 🐘 toot

[toot][toot] is a share page for Mastodon, allowing you to share stuff cross-instance.
Just put in your post text and the instance URL and click "Toot!"

And if you open this page with `text` URL parameter, it will be inserted in the
text field. Same thing with `instance` URL parameter. This can be used to build
custom share buttons for Mastodon:

```html
<a href="https://toot.karamoff.dev/?text=Hello%20world&instance=https%3A%2F%2Fmastodon.xyz">
  Share on Mastodon  
</a>
```

toot is used in [shareon][shareon], ethical social sharing buttons.

----

[![Powered by Vercel](https://badgen.net/badge/powered%20by/vercel/black)](https://vercel.com)

[toot]: https://toot.karamoff.dev
[shareon]: https://shareon.js.org
