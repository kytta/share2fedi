/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { persistentAtom } from "@nanostores/persistent";
import { getUrlDomain } from "@scripts/util";
import { action, onMount } from "nanostores";

const OLD_LOCAL_STORAGE_KEY = "recentInstances";
const LOCAL_STORAGE_KEY = "savedInstances";
const CAPACITY = 5;

export const $savedInstances = persistentAtom<Set<string>>(
	LOCAL_STORAGE_KEY,
	new Set(),
	{
		encode: (set) => JSON.stringify([...set]),
		decode: (value) => new Set(JSON.parse(value)),
	},
);

onMount($savedInstances, () => {
	// XXX: The conversion to a domain need to be done to support legacy
	//  users, who may have full URLs in their Storage
	const oldItem = localStorage.getItem(OLD_LOCAL_STORAGE_KEY);
	if (!oldItem) {
		return;
	}

	$savedInstances.set(
		new Set(
			JSON.parse(oldItem).map((instanceUrl: string) =>
				getUrlDomain(instanceUrl),
			),
		),
	);
	localStorage.removeItem(OLD_LOCAL_STORAGE_KEY);
});

export const save = action($savedInstances, "save", (store, instance) => {
	store.set(
		new Set([getUrlDomain(instance), ...store.get()].slice(0, CAPACITY)),
	);
});
