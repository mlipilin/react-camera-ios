const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../demo/index.js'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../build/static/'),
    publicPath: '/static/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../build/index.html'),
      template: path.resolve(__dirname, 'template.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\//,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, '../demo/theme'),
    },
    extensions: ['.js', '.sass'],
  },
};
