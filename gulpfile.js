var gulp = require("gulp");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task('start-webserver', function() {
  new WebpackDevServer(webpack(webpackConfig), {
    contentBase: __dirname + '/dist'
  }).listen(8080, "localhost");
});

gulp.task("compile-app", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    callback();
  });
});

gulp.task("copy-files", function() {
  var files = [
    'src/index.html'
  ];
  gulp.src(files)
    .pipe(gulp.dest("dist"));
});

gulp.task('watch-static', function() {
  gulp.watch("src/*.html", ["copy-files"]);
});

gulp.task("default", ["copy-files", "compile-app", "start-webserver", "watch-static"]);
