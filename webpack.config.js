const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "sourcemap" : null,
  entry: "./App.js",
  devServer: {
    inline: true,
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: []
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style-loader!css-loader?modules!postcss-loader'
      },
      {
        test: /\.css$/,
        exclude: /(src)/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  postcss: () => [precss, autoprefixer],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
