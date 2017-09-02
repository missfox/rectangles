const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: 'styles/[name].css',
  allChunks: false,
});

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'index'),
    path.join(__dirname, 'src/styles', 'index.less'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.jsx$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
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
                minimize: false,
              },
            },
            'less-loader',
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
      PRODUCTION: JSON.stringify(false),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    moduleExtensions: ['.js', '.css'],
    extensions: ['.css', '.js', '.jsx', '.html', '.json', '.less'],
  },
  resolveLoader: {
    modules: ['./', 'node_modules'],
    extensions: ['.css', '.js', '.jsx', '.html', '.json', '.less'],
  },
  devServer: {
    host: 'localhost',
    port: '3000',
  },
};
