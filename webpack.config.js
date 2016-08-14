const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: './js',
    publicPath: '/js',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      }
    ]
  }
};
