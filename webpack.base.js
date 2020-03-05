const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { envPath, defaultEnvPath } = require('./configs')

module.exports = {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'src/frontend/App/index.js'),
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //   ]
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
          name: '[path][name].[ext]',
        }, 
      },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src'),
        to: path.resolve(__dirname, 'dist'),
        ignore: ['*.ejs'],
      },
    ]),
    new Dotenv({
      path: envPath,
      defaults: defaultEnvPath,
      systemvars: true,
    }),
  ],
}
