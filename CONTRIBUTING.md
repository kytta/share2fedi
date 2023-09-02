<!--
This file is part of Share₂Fedi
https://github.com/kytta/share2fedi

SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

# Contributing guide

First off, thank you for considering contributing to Share₂Fedi! There are many
ways you can improve on the project:

- [write new and improve on the old code](#improving-code)
- [write documentation](#writing-documentation)
- [translate UI strings](#translating)
- [report bugs](#reporting-bugs)

Please, follow this guide if you want to contribute. We promise, it's not too
many rules! Following this helps us merge changes quicker!

Unsure where to begin contributing? You can start by looking through
[the help-wanted issues](https://github.com/kytta/share2fedi/labels/help%20wanted)!

## Improving code

Before you start, make sure you've got a fresh Node.js version (v18 should work)
installed. You'll also need to [install pnpm](https://pnpm.io/installation), as
this is our package manager of choice.

1. Fork the repository and clone it
2. Install dependencies:

   ```sh
   pnpm install
   ```

3. To start a dev server, run:

   ```sh
   pnpm dev
   ```

   This server will auto-update on changes to the file

4. After implementing a feature, create a new Git branch and commit your changes
   on it
5. Push the branch and open a PR.

### Adding support for other Fediverse projects

In order for a Fediverse project to be supported, it has to have a "Share" page
located at a fixed address. That means, that the address is the same for all
users and all frontends. For example, Mastodon's "Share" page is always at
`/share`. The share page should also accept the text of the post via URL
parameters. For example, Mastodon allows pre-filling the text of a post using
`?text=`. Lastly, it should be listed on
[fediverse.observer](https://fediverse.observer/).

If the Fediverse project satisfies these requirements, you can add it to
Share2Fedi. For this:

1. Add an entry to `supportedProjects` inside `src/lib/project.ts`.
   - keep the list in alphabetical order
   - the key should match the software name from NodeInfo/fediverse.observer
   - the value should be an object of type `ProjectPublishConfig`. The endpoint
     is the path to the "Share" page (leading slash optional).
   - if the service you're adding is a flavour of an already supported service,
     use the variable to reduce code duplication. See `mastodonConfig` for an
     example
2. Pick an instance of the project you've added and visit
   `/api/detect/<INSTANCE-DOMAIN>`. Make sure the detection is correct
3. Go to the `/` and try to share something to the instance. Make sure the
   "Share" page opens with correct parameters.

## Writing documentation

Share₂Fedi's documentation is pretty complete at the moment, but you are free to
fix errors and to add clarifications. The only documentation we have is the
`README.md` and `CONTRIBUTING.md` that you're reading right now.

## Translating

Starting with v3, Share₂Fedi has a very primitive translation framework built
in. Despite it being simple, you can edit translations and add new languages in
form of JSON-based dictionaries.

There are two ways you can add/edit translations:

1. The JSON files under `src/i18n/translations` represent dictionaried for
   different languages. The two-letter codes correspond to the ISO 639-1
   language codes.
   - to edit translations, just edit the files. Refer to
     [the coding guide](#improving-code) for more information on how to do this.
2. [Weblate](https://translate.codeberg.org/engage/share2fedi/), a web-based
   tool that simplifies this process.
   - we use Codeberg's Weblate instance, which requires a Codeberg account. If
     you have one, this is the easiest way to edit translations.

## Reporting bugs

> [!IMPORTANT]  
> If you find a security vulnerability, do NOT open an issue. Email
> [Nikita Karamov](mailto:me@kytta.dev) instead.

If you find a bug you can't (or don't want to) fix yourself, don't hesitate
filing an issue. We do not have a preset issue template, but try to answer these
questions in the issue body:

1. What version of Share₂Fedi are you using?
2. How do you deploy it (Node/Vercel/Netlify/Cloudflare/Deno)?
3. What did you do?
4. What did you expect to see?
5. What did you see instead?

---

We are looking forward to your contributions!
