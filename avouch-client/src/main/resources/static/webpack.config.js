const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = smp.wrap({
  cache: {
    type: "filesystem",
  },
  entry: {
    register: ["./js/src/register.js"],
    login: ["./js/src/login.js"],
  },

  output: {
    path: path.resolve(__dirname, "js/lib"),
    filename: "[name].js",
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        options: {
          cacheCompression: false,
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: path.resolve(__dirname, "js/lib/login.js"), destination: "../../../../../avouch-authorization/src/main/resources/static/js/login.js" },
            { source: path.resolve(__dirname, "js/lib/login.js.map"), destination: "../../../../../avouch-authorization/src/main/resources/static/js/login.js.map" },
          ],
        },
      },
    }),
  ],
});
