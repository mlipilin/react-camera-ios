const path = require('path');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

const pathOutput = path.resolve(__dirname, '../gh-pages');
const pathIcons = path.resolve(__dirname, '../public/*.+(png|ico)');
const pathIconsOutput = path.resolve(__dirname, '../gh-pages');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'script.js',
    path: pathOutput,
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../gh-pages/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CopyPlugin([
      {
        from: pathIcons,
        to: pathIconsOutput,
        flatten: true,
      },
    ]),
  ],
});
