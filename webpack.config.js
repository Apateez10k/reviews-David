const path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = [
  {
    plugins: [
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify('http://ec2-52-53-194-112.us-west-1.compute.amazonaws.com'),
        APIKEY: JSON.stringify('YOUR_API_KEY'),
      }),
    ],
    context: __dirname + '/client',
    entry: './server.jsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include : SRC_DIR,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'env']
          },
        },
      ],
    },
    output: {
      path: __dirname + '/public',
      filename: 'server.js',
      libraryTarget: 'commonjs',
    },
  },
  {
    plugins: [
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify('http://ec2-52-53-194-112.us-west-1.compute.amazonaws.com'),
        APIKEY: JSON.stringify('YOUR_API_KEY'),
      }),
    ],
    context: __dirname + '/client',
    entry: './client.jsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include : SRC_DIR,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'env']
          },
        },
      ],
    },
    output: {
      path: __dirname + '/public',
      filename: 'client.js',
    }
  },
];

