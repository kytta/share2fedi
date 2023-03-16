/*!
 * @source: https://github.com/kytta/share2fedi/blob/main/src/count.js
 *
 * @licstart  The following is the entire license notice for the
 *            JavaScript code in this page.
 *
 * toot - Cross-instance share page for Mastodon
 * Copyright (C) 2022  Nikita Karamov <me@kytta.dev>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 *          for the JavaScript code in this page.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// This is the analytics code for toot. It just sends a beacon to GoatCounter
// with hardcoded path. This is way more lightweight, performant
// and privacy-friendly than the default GC script.

// Check if the default GC URL resolves
// This allows us to not track people with ad blockers

if (
	window.location.host === "toot.kytta.dev" ||
	window.location.host === "s2f.kytta.dev" ||
	window.location.host === "share2fedi.kytta.dev"
) {
	// eslint-disable-next-line unicorn/prefer-top-level-await
	fetch("//gc.zgo.at/", { method: "HEAD" }).then((result) => {
		if (!result.ok) {
			return;
		}

		const screen = encodeURIComponent(
			[
				window.screen.width,
				window.screen.height,
				window.devicePixelRatio || 1,
			].join(",")
		);

		const random = encodeURIComponent(Math.random().toString(36).slice(2));

		navigator.sendBeacon(
			`https://share2fedi.goatcounter.com/count?p=%2F&s=${screen}&b=0&rnd=${random}`
		);
	});
}
