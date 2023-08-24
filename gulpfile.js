const path = require("path");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");

const SOURCE_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "public");

function html() {
	return gulp
		.src(path.join(SOURCE_DIR, "index.html"))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function css() {
	return gulp
		.src(path.join(SOURCE_DIR, "scss", "*.scss"))
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(postcss([require("autoprefixer"), require("postcss-csso")]))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function js() {
	return gulp
		.src([
			path.join(SOURCE_DIR, "main.js"),
			path.join(SOURCE_DIR, "count.js"),
			path.join(SOURCE_DIR, "translate.js"),
		])
		.pipe(sourcemaps.init())
		.pipe(terser({ ecma: 5 }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function staticFiles() {
	return gulp
		.src(path.join(SOURCE_DIR, "static", "**", "*"))
		.pipe(gulp.dest(OUTPUT_DIR));
}

exports.default = gulp.parallel(html, css, js, staticFiles);

exports.watch = () => {
	gulp.watch(path.join(SOURCE_DIR, "index.html"), html);
	gulp.watch(path.join(SOURCE_DIR, "scss", "*.scss"), css);
	gulp.watch(path.join(SOURCE_DIR, "*.js"), js);
	gulp.watch(path.join(SOURCE_DIR, "static", "**", "*"), staticFiles);
};
