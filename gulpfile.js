const { join, resolve } = require("path");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");

const SOURCE_DIR = resolve(__dirname, "src");
const OUTPUT_DIR = resolve(__dirname, "public");

function html() {
	return gulp.src(join(SOURCE_DIR, "index.html")).pipe(gulp.dest(OUTPUT_DIR));
}

function css() {
	return gulp
		.src(join(SOURCE_DIR, "scss", "*.scss"))
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(postcss([require("autoprefixer"), require("postcss-csso")]))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function js() {
	return gulp
		.src([join(SOURCE_DIR, "main.js"), join(SOURCE_DIR, "count.js")])
		.pipe(sourcemaps.init())
		.pipe(terser({ ecma: 5 }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function static() {
	return gulp
		.src(join(SOURCE_DIR, "static", "**", "*"))
		.pipe(gulp.dest(OUTPUT_DIR));
}

exports.default = gulp.parallel(html, css, js, static);

exports.watch = () => {
	gulp.watch(join(SOURCE_DIR, "index.html"), html);
	gulp.watch(join(SOURCE_DIR, "scss", "*.scss"), css);
	gulp.watch(join(SOURCE_DIR, "*.js"), js);
	gulp.watch(join(SOURCE_DIR, "static", "**", "*"), static);
};
