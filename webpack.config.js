module.exports = {
  entry: "./src/app/app-controller.js",
  devtool: 'source-map',
  output: {
    path: __dirname + "/dist",
    filename: "all.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
