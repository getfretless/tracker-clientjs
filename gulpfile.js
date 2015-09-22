var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var connect = require("gulp-connect");

gulp.task('start-webserver', function() {
  connect.server({
    root: 'dist'
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

gulp.task("copy-files", function() {
  var files = [
    'src/index.html'
  ];
  gulp.src(files)
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch("src/**/*.js", ["compile-app"]);
  gulp.watch("src/index.html", ["copy-files"]);
});

gulp.task("default", ["copy-files", "compile-app", "start-webserver", "watch"]);
