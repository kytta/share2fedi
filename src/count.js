/*!
 * © 2022 Nikita Karamov
 * Licensed under AGPL v3 or later
 */

// This is the analytics code for Share₂Fedi. It just sends a beacon
// to GoatCounter with hardcoded path. This is way more lightweight, performant
// and privacy-friendly than the default GC script.
if (
	window.location.host === "s2f.kytta.dev" ||
	window.location.host === "share2fedi.kytta.dev"
) {
	// eslint-disable-next-line unicorn/prefer-top-level-await
	fetch("//gc.zgo.at/", { method: "HEAD" }).then((result) => {
		// Check if the default GC URL resolves
		// This allows us to not track people with ad blockers
		if (!result.ok) {
			return;
		}

		const screen = encodeURIComponent(
			[
				window.screen.width,
				window.screen.height,
				window.devicePixelRatio || 1,
			].join(","),
		);

		const random = encodeURIComponent(Math.random().toString(36).slice(2));

		navigator.sendBeacon(
			`https://share2fedi.goatcounter.com/count?p=%2F&s=${screen}&b=0&rnd=${random}`,
		);
	});
}
