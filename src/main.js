/*!
 * @source: https://codeberg.org/kytta/toot/src/branch/main/src/main.js
 *
 * @licstart  The following is the entire license notice for the
 *            JavaScript code in this page.
 *
 * share2fedi - Instance-agnostic share page for the Fediverse.
 * Copyright (c) 2020-2022 Nikita Karamov <me@kytta.dev>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 *
 * @licend  The above is the entire license notice
 *          for the JavaScript code in this page.
 *
 * SPDX-License-Identifier: ISC
 */

const INSTANCE_LIST_URL = "https://api.joinmastodon.org/servers";

const $instance = document.getElementById("instance");
const $instanceDatalist = document.getElementById("instanceDatalist");

/**
 * Adds missing "https://" and ending slash to the URL
 *
 * @param {string} url URL to normalize
 * @return {string} normalized URL
 */
function normalizeUrl(url) {
	if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
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
	const instanceDomains = JSON.parse(this.responseText).map((i) => i.domain);
	if (currentInstance && instanceDomains.indexOf(currentInstance) < 0) {
		instanceDomains.push(currentInstance);
	}
	instanceDomains.sort();

	for (let i = 0; i < instanceDomains.length; i++) {
		const $option = document.createElement("option");
		$option.value = normalizeUrl(instanceDomains[i]);
		$instanceDatalist.appendChild($option);
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

const prefillInstance = window.localStorage.getItem("mastodon_instance");

const URLParams = window.location.search.substr(1).split("&");
for (let i = 0; i < URLParams.length; i++) {
	const URLParamPair = URLParams[i].split("=");
	if (URLParamPair[0] === "text") {
		document.getElementById("text").value = decodeURIComponent(URLParamPair[1]);
	} else if (URLParamPair[0] === "instance") {
		prefillInstance = decodeURIComponent(URLParamPair[1]);
	}
}

if (prefillInstance != null) {
	$instance.value = normalizeUrl(prefillInstance);
}

$instance.addEventListener("focus", loadInstances);
