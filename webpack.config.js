const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { isProd } = require('./locals');

module.exports = {
  context: __dirname, // string (absolute path!),
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, 'js'),
    publicPath: '/js',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.styl$/,
       use: [ 'style-loader', 'css-loader', 'stylus-loader' ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin()
  ],

  target: 'web', // enum
  stats: 'errors-only',
};
