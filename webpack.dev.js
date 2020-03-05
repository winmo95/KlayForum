const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const baseConfig = require('./webpack.base')
const devServerConfig = require('./configs/devServer.config')

const gitRevisionPlugin = new GitRevisionPlugin()


const sharedStylesPath = path.resolve(__dirname, '/src/klaytn/', 'SharedStyles');
const componentsPath = path.resolve(__dirname, '/src/frontend', 'Components');
const containersPath = path.resolve(__dirname, '/src/frontend', 'Containers');
const viewsPath = path.resolve(__dirname, '/src/frontend', 'Views');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: devServerConfig,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src/styles')],
              data: '@import "./src/styles/_variables.scss";',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('postcss-nesting')
              ]
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'dev',
      template: path.resolve(__dirname, 'static/index.html'),
      inject: true,
      origin: `http://localhost:8888/`,
    }),
    new DefinePlugin({
      DEV: true,
      'process.env.version': JSON.stringify(gitRevisionPlugin.commithash().slice(0, 7)), // TODO: delete when real
      DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),
      DEPLOYED_ADDRESS2: JSON.stringify(fs.readFileSync('deployedAddress2', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI2: fs.existsSync('deployedABI') && fs.readFileSync('deployedABI2', 'utf8'),
    }),
    new HotModuleReplacementPlugin(),
  ],

  resolve : {
    extensions: ['*','.js', '.css'],
    alias: {
      SharedStyles: sharedStylesPath,
      Components: componentsPath,
      Containers: containersPath,
      Views: viewsPath,
    },
  },
})
