import { type AstroLoggerDestination } from "astro";
import {
	getLogger as getLogTapeLogger,
	type LogLevel,
} from "@logtape/logtape";

export type LogTapeLoggerOptions = {
	category?: string | Array<string>;
	// level?: LogLevel;
};

/**
 * Normalize category to array format.
 */
function normalizeCategory(
	category: string | readonly string[],
): readonly string[] {
	return typeof category === "string" ? [category] : category;
}

export default function logTapeLogger(options: LogTapeLoggerOptions = {}) {
	console.group("LogTape setup");
	const category = normalizeCategory(options.category ?? ["astro"]);
	const logger = getLogTapeLogger(category);

	// const level = options.level ?? "debug";
	console.groupEnd();

	return {
		write({label, level, message}) {
			console.debug({label, level, message})
			if (level === "silent") return;

			// const localLogger = label ? logger.getChild(label) : logger;
			logger[level as LogLevel](message, {label})
		},
	} satisfies AstroLoggerDestination;
}
