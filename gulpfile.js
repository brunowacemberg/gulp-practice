var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require("gulp-inject");
var webserver = require('gulp-webserver');

gulp.task('css', function () {
    return gulp.src('src/assets/sass/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('build/assets/css/'));
});

gulp.task("html", function() {
    return gulp.src('src/**/*.html')
                .pipe(gulp.dest('build/'));
});

var jsFiles = 'src/assets/js/**/*.js',
    jsDest = 'build/assets/js/';

gulp.task('js', function () {
    return gulp.src(jsFiles).pipe(gulp.dest(jsDest));
});

/////////// 

gulp.task("copy", ["html", "css", "js"]);

gulp.task('inject', ['copy'], function () {
    var css = gulp.src('build/assets/css/**/*.css');
    var js = gulp.src('build/assets/js/**/*.js');
    return gulp.src('build/index.html')
        .pipe(inject(css, { relative: true }))
        .pipe(inject(js, { relative: true }))
        .pipe(gulp.dest('build/'));
});

gulp.task('serve', ['inject'], function () {
    return gulp
        .src("build/")
        .pipe(webserver({ 
            port: 3000,
            livereload: true
        }));   
});

gulp.task('watch', ['serve'], function () {
    gulp.watch('src/**/*', ['inject']);
});


gulp.task("default", ["watch"]);
