<<<<<<< HEAD
const path=require('path');
const webpack=require('webpack');
const baseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(process.cwd(),'./dist'),
    hot: true,
    port:8080,
    open:true,
    stats: "errors-only",
  },
  devtool: "cheap-source-map",
  mode: "development",
  stats: "errors-only",
});
=======
const path=require('path');
const webpack=require('webpack');
const baseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(process.cwd(),'./dist'),
    hot: true,
    port:8080,
    open:true,
    stats: "errors-only",
  },
  devtool: "cheap-source-map",
  mode: "development",
  stats: "errors-only",
});
>>>>>>> ee01b6bcdacbe1590963eee30db2e802c5f5f893