module.exports = {
  entry: "./src/app/components/tracker-body.js",
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
