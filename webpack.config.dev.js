var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['react', 'es2015', 'stage-0']
      },
      include: path.join(__dirname, 'src')
    }]
  }
};
