
const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require("./webpack.base.config");
const ApplyMonitorReport = require("@apply-monitor/report");


module.exports = merge(baseConfig, {
    mode: 'production',
    devtool:'sourcemap',
    plugins: [
      new ApplyMonitorReport({
        url:'http://127.0.0.1:8080/api/common/upload/sourcemap',
        project:'testvue',
        version:'1.0.2',
        afterDelMap:true
      }),
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
