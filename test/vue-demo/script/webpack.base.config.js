const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// 从css文件中提取css代码到单独的文件中，对css代码进行代码压缩等
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ApplyMonitorReport = require("@apply-monitor/report");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
      {
        test: /.vue$/,
        use: "vue-loader",
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new cleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash].css",
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'../index.html'),
      filename: 'index.html',
      // chunks: [name],
      inject: true,
    }),
    new ApplyMonitorReport()
  ],
};
