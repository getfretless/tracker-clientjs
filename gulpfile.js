var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

var externalJs = [
  'node_modules/angular/angular.min.js',
  'node_modules/angular-ui-router/release/angular-ui-router.min.js'
];

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    // .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    // .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
