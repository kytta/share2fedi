# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1]

### Added

- `.node-version` file for nodenv
- Added `engines.node` field to `package.json`
  - this is required to ensure the correct environment for builds

### Security

- Bumped insecure Pug libraries
  - `pug-code-gen` (#9)
  - `pug` (#10)
- Bumped other dependencies

## [1.1.0]

### Added

- Add CHANGELOG as file

### Changed

- License changed from MIT to AGPL-3.0
- Add new, Mastodon-like logo (#6)

## [1.0.0]

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

[Unreleased]: https://github.com/NickKaramoff/toot/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/NickKaramoff/toot/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/NickKaramoff/toot/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/NickKaramoff/toot/compare/e85aa15400bcdbcccf655d331f72df8304744b85...v1.0.0
