const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../src/index.js'),
  mode: 'production',
  output: {
    filename: 'index.js',
    library: 'reactCameraIOS',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../build'),
    publicPath: '',
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
});
