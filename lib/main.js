/*!
 * @source: https://github.com/kytta/share2fedi/blob/main/lib/main.js
 *
 * @licstart  The following is the entire license notice for the
 *            JavaScript code in this page.
 *
 * share2fedi - Instance-agnostic share page for the Fediverse.
 * Copyright (C) 2020-2023  Nikita Karamov <me@kytta.dev>
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

const LOCAL_STORAGE_KEY = "recentInstances";
const RECENT_INSTANCES_SIZE = 5;

const $form = document.querySelector("#js-s2f-form");
const $instance = document.querySelector("#instance");

/**
 * Adds missing "https://" and ending slash to the URL
 *
 * @param {string} url URL to normalize
 * @return {string} normalized URL
 */
function normalizeUrl(url) {
	if (!url.includes("http://") && !url.includes("https://")) {
		url = "https://" + url;
	}
	if (url.at(-1) !== "/") {
		url = url + "/";
	}
	return url;
}

function getRecentInstances() {
	const storedValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
	if (!storedValue) return [];
	return JSON.parse(storedValue);
}

function rememberInstance(instance) {
	const recentInstances = getRecentInstances();

	const index = recentInstances.indexOf(instance);
	if (index >= 0) {
		recentInstances.splice(index, 1);
	}
	recentInstances.unshift(instance);
	recentInstances.length = RECENT_INSTANCES_SIZE;

	window.localStorage.setItem(
		LOCAL_STORAGE_KEY,
		JSON.stringify(recentInstances),
	);
}

function onFormSubmit(event) {
	const formData = new FormData(event.target);

	if (formData.get("remember")) {
		rememberInstance(formData.get("instance"));
	}
	return true;
}

let prefillInstance = getRecentInstances()[0];

const URLParameters = window.location.search.slice(1).split("&");
for (const URLParameter of URLParameters) {
	const URLParameterPair = URLParameter.split("=");
	if (URLParameterPair[0] === "text") {
		document.querySelector("#text").value = decodeURIComponent(
			URLParameterPair[1],
		);
	} else if (URLParameterPair[0] === "instance") {
		prefillInstance = decodeURIComponent(URLParameterPair[1]);
	}
}

if (prefillInstance != undefined) {
	$instance.value = normalizeUrl(prefillInstance);
}

$form.addEventListener("submit", onFormSubmit);
