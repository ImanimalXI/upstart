var gulp = require('gulp'),
    less = require('gulp-less-sourcemap'),
    path = require('path'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    gulpkss = require('gulp-kss'),
    jshint = require('gulp-jshint'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyCSS = require('gulp-minify-css');

//
/**
 * JS hint task
 */
gulp.task('jshint', function() {
    gulp.src('./dev/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//
/**
 * minify new images
 */
gulp.task('imagemin', function() {
    var imgSrc = './dev/img/**/*',
        imgDst = './app/img';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

/**
 * CSS
 */
gulp.task('less', function () {
  gulp.src(['./dev/less/app.less'])
    .pipe(less({
      generateSourceMap: true, // default true
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./app/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
    gulp.src(['./app/*.css'])
        .pipe(concat('app.css'))
        //.pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/'));
});

gulp.task('styleguide', function(){
    gulp.src(['dev/less/**/*.less'])
        .pipe(gulpkss({
            overview: __dirname + '/dev/less/styleguide.md'
        }))
        .pipe(gulp.dest('styleguide/'));

    //Concat and compile all your styles for correct rendering of the styleguide.
    gulp.src('less/app.less')
        .pipe(less())
        .pipe(concat('css/app.css'))
        .pipe(gulp.dest('styleguide/'));
});

/**
 * minify new or changed HTML pages
 */
gulp.task('htmlpage', function() {
    var htmlSrc = './dev/*.html',
        htmlDst = './app';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

//
/**
 * JS concat, strip debugging and minify
 */
gulp.task('scripts', function() {
    gulp.src(['./dev/js/*.js'])
        .pipe(concat('app.js'))
        .pipe(stripDebug())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./app'));
});

gulp.task('default', ['less', 'imagemin', 'htmlpage', 'scripts', 'styles', 'styleguide']);

gulp.task('dev', ['less', 'imagemin', 'htmlpage', 'scripts', 'styles', 'styleguide'], function() {
    gulp.watch(['dev/js/**/*'], ['scripts']);
    gulp.watch(['./dev/less/**/*'], ['less','styleguide']);
});

