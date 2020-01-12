const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const clientConfig = (env, options) => {
  const config = {
    target: "web",
    entry: {
      main: "./src/index.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      publicPath: "/"
    },
    // absolute path for src/*
    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"],

      // alias for specific releative path to absolute path
      // ex) images: path.resolve(__dirname, "src/assets/images")
      alias: {}
    },
    module: {
      rules: [
        // test: A condition that must be met
        // exclude: A condition that must not be met
        // include: An array of paths or files where the imported files will be transformed by the loader
        // loader: A string of “!” separated loaders
        // loaders: An array of loaders as string
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/transform-runtime"] // 제안단계에 있는 사양을 지원하기 위한 바벨 플러그인들
            }
          }
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!sass-loader"
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
              //options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                esModule: false
              }
            }
          ]
        },
        {
          // babel-loader와 같은 다른 로더들에 의해 수정되지 않은 소스를 검사해야 하므로 enforce: pre
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitWarning: true, // default: false
            failOnError: false, // default
            failOnWarning: false // default
          }
        }
      ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all" // initial, async
          }
        }
      }
    }
  };

  if (options.mode === "development") {
    // 개발
    config.plugins = [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        excludeChunks: ["server"],
        showErrors: true
      })
    ];

    config.devtool = "inline-source-map";
    config.devServer = {
      hot: true,
      host: "0.0.0.0",
      contentBase: path.resolve(__dirname, "dist"),
      stats: {
        color: true
      }
    };
  } else {
    // 라이브
    config.plugins = [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        excludeChunks: ["server"],
        showErrors: true
      }),
      new CleanWebpackPlugin(["dist"]),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ];

    config.optimization = {
      ...config.optimization,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    };
  }

  return config;
};

module.exports = (env, arg) => clientConfig(env, arg);
