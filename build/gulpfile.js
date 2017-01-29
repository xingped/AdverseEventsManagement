var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
gulp.task('angular', function() {
	return gulp.src(['./angular/app.js', './angular/directives/**/*.js', './angular/controllers/**/*.js', './angular/providers/**/*.js'])
		//.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		//.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('../public/js'));
});
gulp.task('vendor', function() {
	return gulp.src(['./vendor/js/**/*.js'])
		//.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'))
		//.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('../public/js'));
});
gulp.task('sass', function() {
	return gulp.src(['./sass/main.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../public/css'));
});
gulp.task('watch', function() {
	gulp.watch('./angular/**/*.js', ['angular']);
	gulp.watch('./vendor/js/**/*.js', ['vendor']);
	gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task('default', ['angular', 'vendor', 'sass', 'watch']);