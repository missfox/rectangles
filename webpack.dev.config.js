const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: 'styles/[name].css',
  allChunks: false,
});

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: require.resolve('react'),
        use: 'expose-loader?React',
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
      chunks: ['main'],
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    moduleExtensions: ['.css', '.js', '.jsx', '.html'],
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
  },
  devServer: {
    host: 'localhost',
    port: '3000',
  },
};
