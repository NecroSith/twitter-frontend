// Gilp-pack v1.0 made by Yan Pustynnyy
// Heavily inspired by my mentors and colleagues at WebCademy.ru 

//  Variable initializing
var gulp = require('gulp'),
	less = require('gulp-less'),
	// sass = require('gulp-sass'),					// Uncomment this if you use SCSS
	browserSync = require('browser-sync').create();
	notify = require('gulp-notify'), 				// For error messaging in console
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'), 				// For error handling
	clean = require('gulp-clean'),
	sequence = require('run-sequence'),


// Watch over all the important folders and refresh the page if changes were made
gulp.task('server',['less'], function() {
    browserSync.init({
    	server: { baseDir: './app/'}
    })
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
});


// Watch over LESS files and refresh the page if changes were made
gulp.task('less', function() {
    return gulp.src('app/less/**/main.less').
    	pipe(plumber({
    		errorHandler: notify.onError(function(err){
    			return {
    				title: 'LESS ERROR',
    				message: err.message
    			}
    		})
    	}))
    	.pipe(sourcemaps.init())
    	.pipe(less())
    	.pipe(autoprefixer({
    		browsers: ['last 3 versions'],
    		cascade: false
    	}))
    	.pipe(gulp.dest('app/css/'))
    	.pipe(browserSync.stream());
});

// Watch over SCSS files and refresh the page if changes were made
// Uncomment if you use SCSS instead of LESS

// gulp.task('sass', function() {
//     return gulp.src('src/scss/**/main.scss').
//     	pipe(plumber({
//     		errorHandler: notify.onError(function(err){
//     			return {
//     				title: 'SCSS ERROR',
//     				message: err.message
//     			}
//     		})
//     	}))
//     	.pipe(sourcemaps.init())
// 		.pipe(less())
// 		.pipe(autoprefixer({
// 			browsers: ['last 3 versions'],
// 			cascade: false
// 		}))
// 		.pipe(gulp.dest('build/css/'))
// 		.pipe(browserSync.stream());
// });


gulp.task('default', function(callback) {
    sequence(
    	['less'],
    	'server',
    	callback);
});



