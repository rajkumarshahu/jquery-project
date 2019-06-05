'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (options) => {
  const dest = Path.join(__dirname, 'dist');

  let webpackConfig = {
    mode: options.mode,
    devtool: options.devtool,
    entry: {
      index: './src/scripts/index',
      video: './src/scripts/video.js',
      products: './src/scripts/products.js',
      addVideo: './src/scripts/addVideo.js',
      addProduct: './src/scripts/addProduct.js'
    },
    // output: {
    //   path: dest,
    //   filename: 'bundle.[hash].js'
    // },
    output: {
      path:__dirname+'/dist/js',

      //replace filename:'app.js'
      filename:'[name].js'
  },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        filename:'index.html',
        template: './src/views/index.html',
        inject: true,
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        filename: 'products.html',
        template: './src/views/products.html',
        inject: true,
        chunks: ['products']
      }),
      new HtmlWebpackPlugin({
        filename: 'addproduct.html',
        template: './src/views/addProduct.html',
        inject: true,
        chunks: ['addProduct']
      }),
      new HtmlWebpackPlugin({
        filename: 'video.html',
        template: './src/views/video.html',
        inject: true,
        chunks: ['video']
      }),
      new HtmlWebpackPlugin({
        filename: 'addvideo.html',
        template: './src/views/addVideo.html',
        inject: true,
        chunks: ['addVideo']
      }),
      new HtmlWebpackPlugin({
        filename: 'dashboard.html',
        template: './src/views/dashboard.html',
        inject: true,
        chunks: ['index']
      }),
      new CleanWebpackPlugin([dest])
    ],
    module: {
       rules: [{
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['es2015']
      //     }
      //   }
       }]
    }
    };

  if (options.isProduction) {
    webpackConfig.entry = ['./src/scripts/index'];

    webpackConfig.plugins.push(
      new UglifyJSPlugin({
        sourceMap: true,
      }),
      ExtractSASS
    );

    webpackConfig.module.rules.push({
      test: /\.s?css/i,
      use: ExtractSASS.extract(['css-loader?sourceMap=true&minimize=true', 'sass-loader'])
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.rules.push({
      test: /\.s?css$/i,
      use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
    }, {
      test: /\.js$/,
      use: 'eslint-loader',
      exclude: /node_modules/
    });

    webpackConfig.devServer = {
      contentBase: dest,
      hot: true,
      port: options.port,
      inline: true
    };
  }

  return webpackConfig;

};