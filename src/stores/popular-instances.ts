/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { persistentAtom } from "@nanostores/persistent";
import { onMount, task } from "nanostores";

const UPDATE_INTERVAL_MS = 1000 * 60 * 60 * 24; // one day

export const $popularInstances = persistentAtom<string[]>(
	"popularInstances",
	[],
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	},
);

export const $lastFetched = persistentAtom<Date>(
	"popularInstancesLastFetched",
	new Date(0),
	{
		encode: (date) => date.toISOString(),
		decode: (encoded) => new Date(encoded),
	},
);

onMount($popularInstances, () => {
	task(async () => {
		if (Date.now() - $lastFetched.get().getTime() < UPDATE_INTERVAL_MS) {
			return;
		}

		try {
			const response = await fetch("/api/instances");
			$popularInstances.set(await response.json());
			$lastFetched.set(new Date());
		} catch (error) {
			console.error("Could not fetch popular instances:", error);
		}
	});
});
