<<<<<<< HEAD

const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require("./webpack.base.config");


module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
      }),
        new HtmlWebpackExternalsPlugin({
          externals: [
            {
              module: "vue",
              entry: "https://lib.baomitu.com/vue/2.6.12/vue.min.js",
              global: "Vue",
            },
          ],
        }),
    ],
    optimization: {
      splitChunks: {
        minSize: 0,
        cacheGroups: {
          commons: {
            name: 'vendors',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },
  });
=======

const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require("./webpack.base.config");


module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
      }),
        new HtmlWebpackExternalsPlugin({
          externals: [
            {
              module: "vue",
              entry: "https://lib.baomitu.com/vue/2.6.12/vue.min.js",
              global: "Vue",
            },
          ],
        }),
    ],
    optimization: {
      splitChunks: {
        minSize: 0,
        cacheGroups: {
          commons: {
            name: 'vendors',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },
  });
>>>>>>> ee01b6bcdacbe1590963eee30db2e802c5f5f893
