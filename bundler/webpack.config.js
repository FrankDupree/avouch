const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const FileManagerPlugin = require("filemanager-webpack-plugin");

const clientPath = "../avouch-client/src/main/resources/static/js/lib";
const authPath = "../avouch-authorization/src/main/resources/static/js/lib/";
console.log(path.resolve(__dirname, "js/lib"))
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
    filename: `[name].js`,
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
            { source: `js/lib/login.js`, destination: `${authPath}login.js` },
            { source: `js/lib/login.js.map`, destination: `${authPath}login.js.map` },
            { source: `js/lib/register.js`, destination: `${authPath}register.js` },
            { source: `js/lib/register.js.map`, destination: `${authPath}register.js.map` },
            { source: `js/lib/vendor_app.js`, destination: `${authPath}vendor_app.js` },
            { source: `js/lib/vendor_app.js.map`, destination: `${authPath}vendor_app.js.map` },
            { source: `js/lib/*.js`, destination: clientPath },
            { source: `js/lib/*.map`, destination: clientPath },
          ],
        },
      },
    }),
  ],
});
