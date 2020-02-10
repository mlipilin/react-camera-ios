const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../src/index.js'),
  // mode: 'production',
  mode: 'development',
  output: {
    filename: 'index.js',
    library: 'react-camera-ios',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../build'),
    publicPath: '',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
});
