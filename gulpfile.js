var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require("gulp-inject");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('css', function () {
    return gulp.src('src/assets/sass/**/*.scss')
                .pipe(sass.sync().on('error', sass.logError))
                .pipe(gulp.dest('build/assets/css/'));
});

gulp.task("html", function() {
    return gulp.src('src/**/*.html')
                .pipe(gulp.dest('build/'));
});

gulp.task('js', function () {
    return gulp.src('src/assets/js/**/*.js').pipe(gulp.dest('build/assets/js/'));
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


gulp.task("serve", ["inject"], function() {
  browserSync.init({
    server: {
      baseDir: "build/"
    }
  });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch("src/**/*", ["inject"]).on("change", reload);;
});


gulp.task("default", ["watch"]);
