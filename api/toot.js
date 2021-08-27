/*!
	toot - Cross-instance share page for Mastodon
	Copyright (C) 2020-2021  Nikita Karamov <nick@karamoff.dev>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published
	by the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

module.exports = function (req, res) {
	let text = "";
	let instanceURL = "https://mastodon.social/";
	if (req.body) {
		if (req.body.text) {
			text = req.body.text;
		}
		if (req.body.instance) {
			instanceURL = req.body.instance;
		}
	}

	return res.redirect(
		303,
		instanceURL + "share?text=" + encodeURIComponent(text)
	);
};
