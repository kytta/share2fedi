/*!
 * @source: https://codeberg.org/kytta/toot/src/branch/main/src/main.js
 *
 * @licstart  The following is the entire license notice for the
 *            JavaScript code in this page.
 *
 * toot - Cross-instance share page for Mastodon
 * Copyright (C) 2020-2022  Nikita Karamov <me@kytta.dev>
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

const INSTANCE_LIST_URL = "https://api.joinmastodon.org/servers";
const LOCAL_STORAGE_KEY = "recentInstances";
const RECENT_INSTANCES_SIZE = 5;

const $instance = document.querySelector("#instance");
const $instanceDatalist = document.querySelector("#instanceDatalist");

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
	if (url.charAt(url.length - 1) !== "/") {
		url = url + "/";
	}
	return url;
}

function onLoadInstancesError() {
	console.error("Couldn't load instance list");
}

function onLoadInstancesSuccess() {
	if (this.status >= 400) {
		return onLoadInstancesError();
	}

	const currentInstance = $instance.value;
	const instanceDomains = JSON.parse(this.responseText).map(
		(index) => index.domain
	);
	if (currentInstance && !instanceDomains.includes(currentInstance)) {
		instanceDomains.push(currentInstance);
	}
	instanceDomains.sort();

	for (const instanceDomain of instanceDomains) {
		const $option = document.createElement("option");
		$option.value = normalizeUrl(instanceDomain);
		$instanceDatalist.append($option);
	}
}

function loadInstances() {
	if ($instanceDatalist.children.length === 0) {
		const request = new XMLHttpRequest();

		request.addEventListener("load", onLoadInstancesSuccess);
		request.addEventListener("error", onLoadInstancesError);

		request.open("GET", INSTANCE_LIST_URL);
		request.send();
	}
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
		JSON.stringify(recentInstances)
	);
}

// Used in HTML
// eslint-disable-next-line no-unused-vars
function onFormSubmit(form) {
	const formData = new FormData(form);

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
			URLParameterPair[1]
		);
	} else if (URLParameterPair[0] === "instance") {
		prefillInstance = decodeURIComponent(URLParameterPair[1]);
	}
}

if (prefillInstance != undefined) {
	$instance.value = normalizeUrl(prefillInstance);
}

$instance.addEventListener("focus", loadInstances);
