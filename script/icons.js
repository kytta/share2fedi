import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { optimize } from "svgo";

const pentagon = join(".", "assets", "pentagon.svg");
const smallLogo = join(".", "assets", "s2f.svg");

const outputDirectory = join(".", "public");

try {
	await Promise.all([
		sharp(pentagon).resize(32).toFile(join(outputDirectory, "favicon-32.png")),
		sharp(pentagon).resize(16).toFile(join(outputDirectory, "favicon-16.png")),
		sharp(smallLogo)
			.resize(140)
			.extend({
				top: 20,
				bottom: 20,
				left: 20,
				right: 20,
				background: "#000",
			})
			.flatten({ background: "#000" })
			.toFile(join(outputDirectory, "apple-touch-icon.png")),
		sharp(smallLogo).resize(192).toFile(join(outputDirectory, "icon-192.png")),
		sharp(smallLogo).resize(512).toFile(join(outputDirectory, "icon-512.png")),
	]);
} catch (error) {
	console.error(error);
}

writeFileSync(
	join(outputDirectory, "icon.svg"),
	optimize(readFileSync(pentagon), {
		path: pentagon,
		multipass: true,
	}).data,
);
