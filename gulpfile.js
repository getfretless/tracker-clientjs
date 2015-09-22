var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var connect = require("gulp-connect");

gulp.task('start-webserver', function() {
  connect.server({
    root: 'src'
  });
});

gulp.task("compile-app", function () {
  var sources = [
    "node_modules/angular/angular.min.js",
    "node_modules/angular-ui-router/release/angular-ui-router.min.js",
    "src/**/*.js"
  ]
  gulp.src(sources)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch("src/**/*.js", ["compile-app"]);
});

gulp.task("default", ["compile-app", "start-webserver", "watch"]);
