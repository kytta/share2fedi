const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");

function html() {
	return gulp.src("./src/index.html").pipe(gulp.dest("./dist/"));
}

function css() {
	return gulp
		.src("./src/scss/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(postcss([require("autoprefixer"), require("postcss-csso")]))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist/"));
}

function js() {
	return gulp
		.src("./src/main.js")
		.pipe(sourcemaps.init())
		.pipe(terser({ ecma: 5 }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist/"));
}

function static() {
	return gulp.src("./src/static/**/*").pipe(gulp.dest("./dist/"));
}

exports.default = gulp.parallel(html, css, js, static);

exports.watch = () => {
	gulp.watch("./src/index.html", html);
	gulp.watch("./src/scss/*.scss", css);
	gulp.watch("./src/main.js", js);
	gulp.watch("./src/static/*", static);
};
