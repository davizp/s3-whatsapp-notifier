const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  externals: [nodeExternals()], // excludes node_modules from bundle
  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: '18'
                }
              }]
            ]
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  optimization: {
    minimize: false  // Lambda needs readable code for stack traces
  },

  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: true,
    chunks: true
  }
};