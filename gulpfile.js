/* global process:true */
const gulp = require('gulp');
const gulpIgnore = require('gulp-ignore');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const del = require('del');
const config = require('./gulp.config');

const env = {
	get mode() {
		return /^prod/.test(process.env.NODE_ENV) ? 'production' : 'development';
	},
};

gulp.task('clean:js', () => {
	return del([`${config.paths.js.dist}/**/*.min.js`, `${config.paths.js.dist}/**/*.map`]);
});

gulp.task('clean:css', () => {
	return del([`${config.paths.css.dist}/**/*.css`, `${config.paths.css.dist}/**/*.map`]);
});

gulp.task('clean', gulp.parallel('clean:js', 'clean:css'));

gulp.task('compile:js', () => {
	return gulp.src([`${config.paths.js.src}/*.js`, `!${config.paths.js.src}/**/*.min.js`])
		.pipe(plumber())
		.pipe(named())
		.pipe(webpackStream(config.webpack.script(env.mode), webpack))
		.pipe(gulp.dest(config.paths.js.dist));
});

gulp.task('compile:css', () => {
	return gulp.src(`${config.paths.css.src}/**/*.{scss, sass}`)
		.pipe(plumber())
		.pipe(named())
		.pipe(webpackStream(config.webpack.style(env.mode), webpack))
		.pipe(gulpIgnore.include(['*.css', '*.css.map']))
		.pipe(gulp.dest(config.paths.css.dist));
});

gulp.task('build', gulp.series('compile:js', 'compile:css'));

gulp.task('watch:js', gulp.series('compile:js', () => {
	gulp.watch([`${config.paths.js.src}/**/*.js`, `!${config.paths.js.src}/**/*.min.js`], gulp.task('compile:js'));
}));

gulp.task('watch:css', gulp.series('compile:css', () => {
	gulp.watch(`${config.paths.css.src}/**/*.{scss, sass}`, gulp.task('compile:css'));
}));

gulp.task('watch', gulp.series('build', () => {
	gulp.watch([`${config.paths.js.src}/**/*.js`, `!${config.paths.js.src}/**/*.min.js`], gulp.task('compile:js'));
	gulp.watch(`${config.paths.css.src}/**/*.{scss, sass}`, gulp.task('compile:css'));
}));
