<!--
This change log is part of Share₂Fedi
https://github.com/kytta/share2fedi

SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
SPDX-License-Identifier: CC0-1.0
-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Share2Fedi now adds a proper user agent header with project information
- new translation languages
  - Simplified Chinese (thx [Poesty](https://social.qunn.eu/user)!)

### Changed

- (POTENTIALLY BREAKING) Node.js version fixed to either 18 or 20.
  - this (temporarily) drops (non-existent) support for Node.js 22
  - by default, Share₂Fedi now assumes and prefers Node.js 20
- GraphQL requests now use variables (instead of string interpolation)
- proxy cache (`s-maxage`) increased from 1 day to 1 week
- updated dependencies

## [3.1.0] - 2024-02-12

## Added

- new translation languages
  - Nederlands/Dutch (thx [Heimen](https://github.com/Vistaus)!)
  - Español/Spanish (thx gallegonovato!)
  - <span dir="rtl">العربية</span>/Arabic (thx ButterflyOfFire](https://mstdn.fr/@butterflyoffire)!)

### Fixed

- locale switcher would not work if an unknown locale is in the local storage

### Changed

- i18n engine improved
  - added support for RTL languages
  - enumerations (of project variations) are now done with Intl.ListFormat and
    thus adhere to the language rules
- disabled search indexing
  - hopefully this will prevent Google shamelessly indexing other's peoples'
    content in Chrome
- moved translations to [Hosted Weblate](https://hosted.weblate.org/engage/share2fedi/)
- updated dependencies

## [v3][3.0.0]

This version is a huge reinvention of toot. The name was changed to Share₂Fedi,
as to indicate that sharing to other federated networks is now possible.

### ⚠️ BREAKING CHANGES

Share₂Fedi is now an [Astro](https://astro.build/) site. The migration allowed
us to have a performant service that is easily hostable on both serverless
platforms, like Vercel or Netlify, as well as locally. Setting the project up
now takes seconds! This comes with changes, though:

- **static files aren't built any more**, but generated server-side
- **new output directory**: ~~`public/`~~ → `dist/`
  - this also means that `public/` **is not ignored any more**

Some changes came with the name change:

- **changed API endpoint path**: ~~`/api/toot`~~ → `/`
  - just send a POST request instead of a GET request with the same body

### Added

- **new federated social networks**
  - Friendica
  - GNU Social
  - Hubzilla
  - Misskey (+ flavours)
- **new ways to host**
  - Netlify
  - Cloudflare Pages
- **multilingual share page**
  - Share₂Fedi can be used in English, French, German, Russian, and Spanish.
    [Help us with other languages!](./src/i18n/translations.ts)
- remembering of multiple Fediverse instances
- new API endpoints
  - `/api/instances` will return the list of popular instances
  - `/api/detect/[host]` will detect the Fediverse project used by a host
- a privacy policy describing what data is being processed and stored
- a link to the status page

### Changed

- **new project name**: Share₂Fedi (see
  [GH#24](https://github.com/kytta/share2fedi/issues/24))
  - new default instance URL: <https://s2f.kytta.dev>
  - new logo
  - new design
- repository moved back to GitHub
- licence of the project is now AGPL v3 **only**
  - for now, this has no effect. If AGPL v4 ever comes out, Share₂Fedi v2 will
    not be available under it
- s2f is now being built with Astro
  - Share₂Fedi is now 100% server-side rendered. You don't have to host any
    static files, all you need is to run the Node server.
  - when developing, the API endpoint can now be tested locally

### Removed

- GoatCounter analytics. I will no longer track the visitors of s2f.kytta.dev

## [2.4.5] - 2023-06-17

### Fixed

- blocked crawling of all pages other than index (#33)

## [2.4.4] - 2023-03-01

### Fixed

- fixed not working instance prefilling (#15)

## [2.4.3] - 2022-12-23

### Changed

- analytics script replaced with own implementation
  - now uses `navigator.sendBeacon()` for a more lightweight solution
  - now doesn't send anything other than path and screen size
- updated CanIUse databases, which may cause some browsers become unsupported

## [2.4.2] - 2022-12-21

### Changed

- analytics should send query parameters anymore

### Removed

- tracking pixel for JS-less analytics

## [2.4.1] - 2022-11-20

### Fixed

- "remember instance on this device" didn't work (#12, #13)

## [2.4.0] - 2022-11-14

### Added

- analytics from GoatCounter
  - the analytics are GDPR-friendly
  - the analytics script is lightweight
  - [the results are publicly accessible](https://share2fedi.goatcounter.com/)
- better instructions for self-hosting (cred Tealk: #4, #5)

## [2.3.1] - 2022-03-16

### Fixed

- wrong font-weight on the "Toot!" button

## [2.3.0] - 2022-03-16

### Changed

- self-hosted the Roboto font due to privacy concerns when using Google Fonts

## [2.2.2] - 2022-02-12

### Changed

- repository moved to Codeberg; updated all URLs

## [2.2.1] - 2021-02-02

### Changed

- changed GitHub username from `NickKaramoff` to `kytta`

## [2.2.0] - 2021-11-04

### Changed

- migrated to PNPM as primary package manager
- change URL from `toot.karamoff.dev` to `toot.kytta.dev`

## [2.1.0] - 2021-08-29

### Added

- LibreJS-compatible licence identifiers
- SPDX licence identifiers

## [2.0.0] - 2021-08-29

### Added

- hosting how-to (#17)
- description in the `<title>` (#13)
- sourcemaps for all files
- licence header to all files

### Changed

- toot doesn't require JS to post anymore (#12)
- make backend not Vercel-dependend
- update `robots.txt`
- use pure HTML instead of Pug
- simplify style and script pipeline

## [1.2.2] - 2021-08-14

### Security

- bumped dependencies (#16, #18)

## [1.2.1] - 2021-05-13

### Security

- bumped dependencies (#14, #15)

## [1.2.0] - 2021-03-17

### Changed

- design of the page so that it looks more like a Mastodon website (without
  impersonating anyone)

### Fixed

- page displacement if a child is added to `<body>` (#11)

## [1.1.2] - 2021-03-12

### Changed

- Node.js version is now 14, since it's now supported by Vercel

### Security

- migrated from `gulp-sass` to `@mr-hope/gulp-sass` to avoid loading and
  building `node-sass` and other old deps

## [1.1.1] - 2021-03-03

### Added

- `.node-version` file for nodenv
- Added `engines.node` field to `package.json`
  - this is required to ensure the correct environment for builds

### Security

- Bumped insecure Pug libraries
  - `pug-code-gen` (#9)
  - `pug` (#10)
- Bumped other dependencies

## [1.1.0] - 2021-01-30

### Added

- Add CHANGELOG as file

### Changed

- License changed from MIT to AGPL-3.0
- Add new, Mastodon-like logo (#6)
- Change "Mastodon" text to Mastodon's logo (#6)

## [1.0.0] - 2021-01-29

### Added

- Provide a list of Mastodon servers from joinmastodon.org (#1)
- Start marking version numbers

### Changed

- Reword the Remember checkbox (#2)
- Open Mastodon in the same tab (#3, #4)

## (no version number)

Initial release of the site

### Added

- Add main code for the site

[Unreleased]: https://github.com/kytta/share2fedi/compare/v3.1.0...HEAD
[3.1.0]: https://github.com/kytta/share2fedi/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/kytta/share2fedi/compare/v2.4.5...v3.0.0
[2.4.5]: https://github.com/kytta/share2fedi/compare/v2.4.4...v2.4.5
[2.4.4]: https://github.com/kytta/share2fedi/compare/v2.4.3...v2.4.4
[2.4.3]: https://github.com/kytta/share2fedi/compare/v2.4.2...v2.4.3
[2.4.2]: https://github.com/kytta/share2fedi/compare/v2.4.1...v2.4.2
[2.4.1]: https://github.com/kytta/share2fedi/compare/v2.4.0...v2.4.1
[2.4.0]: https://github.com/kytta/share2fedi/compare/v2.3.1...v2.4.0
[2.3.1]: https://github.com/kytta/share2fedi/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/kytta/share2fedi/compare/v2.2.2...v2.3.0
[2.2.2]: https://github.com/kytta/share2fedi/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/kytta/share2fedi/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/kytta/share2fedi/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/kytta/share2fedi/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/kytta/share2fedi/compare/v1.2.2...v2.0.0
[1.2.2]: https://github.com/kytta/share2fedi/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/kytta/share2fedi/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/kytta/share2fedi/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/kytta/share2fedi/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/kytta/share2fedi/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/kytta/share2fedi/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/kytta/share2fedi/compare/e85aa15400bcdbcccf655d331f72df8304744b85...v1.0.0
