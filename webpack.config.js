module.exports = {
  entry: "./src/app/components/tracker-body.js",
  output: {
    path: "./dist",
    filename: "all.js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
