const path=require('path');
const webpack=require('webpack');
const baseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(process.cwd(),'./dist'),
    hot: true,
    port:8083,
    open:true,
    stats: "errors-only"
  },
  devtool: "source-map",
  mode: "development",
  // stats: "errors-only",
});
