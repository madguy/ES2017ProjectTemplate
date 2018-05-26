/* global process:true */
const gulp = require('gulp');
const gulpIgnore = require('gulp-ignore');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const sequence = require('run-sequence');
const del = require('del');
const config = require('./gulp.config');

const env = {
	get mode() {
		return /^prod/.test(process.env.NODE_ENV) ? 'production' : 'development';
	}
};

gulp.task('clean:js', (next) => {
	del([`${config.paths.js.dist}/**/*.min.js`, `${config.paths.js.dist}/**/*.map`], next);
});

gulp.task('clean:css', (next) => {
	del([`${config.paths.css.dist}/**/*.css`, `${config.paths.css.dist}/**/*.map`], next);
});

gulp.task('clean', ['clean:js', 'clean:css']);

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

gulp.task('build', (next) => {
	sequence(['compile:js', 'compile:css'], next);
});

gulp.task('watch:js', ['compile:js'], () => {
	gulp.watch([`${config.paths.js.src}/**/*.js`, `!${config.paths.js.src}/**/*.min.js`], ['compile:js']);
});

gulp.task('watch:css', ['compile:css'], () => {
	gulp.watch(`${config.paths.css.src}/**/*.{scss, sass}`, ['compile:css']);
});

gulp.task('watch', (next) => {
	sequence('build', ['watch:js', 'watch:css'], next);
});
