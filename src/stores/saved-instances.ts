import { persistentAtom } from "@nanostores/persistent";

const LOCAL_STORAGE_KEY = "recentInstances";
const RECENT_INSTANCES_SIZE = 5;

export const savedInstances = persistentAtom<Set<string>>(
	LOCAL_STORAGE_KEY,
	new Set(),
	{
		encode: (set) => JSON.stringify([...set]),
		decode: (value) => new Set(JSON.parse(value)),
	},
);

export const saveInstance = (instance: string) => {
	savedInstances.set(
		new Set(
			[instance, ...savedInstances.get()].slice(0, RECENT_INSTANCES_SIZE),
		),
	);
};
