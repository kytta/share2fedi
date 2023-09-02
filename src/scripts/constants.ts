/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Enumeration of the supported fediverse projects.
 *
 * The values of this enum are used as the keys for the fediverse.observer API,
 * as the icon names, etc.
 */
export enum FediverseProject {
	Calckey = "calckey",
	GlitchCafe = "glitchcafe",
	Fedibird = "fedibird",
	Firefish = "firefish",
	FoundKey = "foundkey",
	Friendica = "friendica",
	GNUSocial = "gnusocial",
	Hometown = "hometown",
	Hubzilla = "hubzilla",
	Mastodon = "mastodon",
	Meisskey = "meisskey",
	Misskey = "misskey",
}
