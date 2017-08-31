/* eslint-disable jsx-a11y/href-no-hash */
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');

const extractLess = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  disable: false,
  allChunks: true,
});

const cleanCSSPlugin = new LessPluginCleanCSS({ advanced: true });

const compressOptions = {
  screw_ie8: true,
  conditionals: true,
  unused: true,
  comparisons: true,
  sequences: true,
  dead_code: true,
  evaluate: true,
  if_return: true,
  join_vars: true,
};

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                plugins: [cleanCSSPlugin],
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|woff|ttf|eot|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    extractLess,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      compress: compressOptions,
      output: {
        comments: false,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['main'],
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    moduleExtensions: ['css', 'js', 'html'],
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
  },
  devtool: false,
};
