import { persistentAtom } from "@nanostores/persistent";
import { getUrlDomain } from "@scripts/util";

const LOCAL_STORAGE_KEY = "recentInstances";
const RECENT_INSTANCES_SIZE = 5;

export const savedInstances = persistentAtom<Set<string>>(
	LOCAL_STORAGE_KEY,
	new Set(),
	{
		encode: (set) => JSON.stringify([...set]),
		decode: (value) => {
			return new Set(
				// XXX: The conversion to a domain need to be done to support legacy
				//  users, who may have full URLs in their Storage
				JSON.parse(value).map((instanceUrl: string) =>
					getUrlDomain(instanceUrl),
				),
			);
		},
	},
);

export const saveInstance = (instance: string) => {
	savedInstances.set(
		new Set(
			[getUrlDomain(instance), ...savedInstances.get()].slice(
				0,
				RECENT_INSTANCES_SIZE,
			),
		),
	);
};
