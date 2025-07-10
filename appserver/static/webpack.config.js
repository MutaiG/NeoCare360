const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    demo: path.join(__dirname, "demo/demo.jsx"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: isProduction ? "[name].[contenthash].js" : "[name].js",
    publicPath: "/",
    clean: isProduction,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "NeoCare360 - Clinical Intelligence Hub",
      template: path.join(__dirname, "demo/standalone/index.html"),
      ...(isProduction && {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    }),
  ],
  ...(isProduction && {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    performance: {
      hints: "warning",
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  }),
  ...(!isProduction && {
    devServer: {
      port: 3001,
      open: false,
      hot: true,
      historyApiFallback: true,
      host: "0.0.0.0",
      allowedHosts: "all",
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      client: {
        logging: "none",
        overlay: {
          errors: false,
          warnings: false,
        },
        webSocketTransport: "ws",
        progress: false,
      },
      setupMiddlewares: (middlewares, devServer) => {
        // Aggressive suppression of event object logging
        const originalConsoleLog = console.log;
        const originalConsoleWarn = console.warn;
        const originalConsoleError = console.error;
        const originalConsoleInfo = console.info;
        const originalConsoleDebug = console.debug;

        const filterEventObjects = (args) => {
          return args.filter((arg) => {
            // Filter out [object Event] logs and related objects
            if (typeof arg === "object" && arg !== null) {
              const objString = Object.prototype.toString.call(arg);

              // Check for any Event-related objects
              if (objString.includes("Event]")) {
                return false;
              }

              // Check constructor name
              if (arg.constructor && arg.constructor.name) {
                const constructorName = arg.constructor.name.toLowerCase();
                if (constructorName.includes("event")) {
                  return false;
                }
              }

              // Check for webpack-dev-server/HMR specific objects
              if (
                arg.type &&
                typeof arg.type === "string" &&
                (arg.target ||
                  arg.currentTarget ||
                  arg.eventPhase !== undefined ||
                  arg.isTrusted !== undefined ||
                  arg.bubbles !== undefined)
              ) {
                return false;
              }

              // Filter WebSocket and connection objects
              if (
                arg.readyState !== undefined ||
                arg.url !== undefined ||
                arg.protocol !== undefined ||
                arg.extensions !== undefined
              ) {
                return false;
              }
            }

            // Filter out string representations
            if (typeof arg === "string") {
              if (
                arg.includes("[object Event]") ||
                (arg.includes("[webpack-dev-server]") && arg.includes("Event"))
              ) {
                return false;
              }
            }

            return true;
          });
        };

        console.log = (...args) => {
          const filteredArgs = filterEventObjects(args);
          if (filteredArgs.length > 0) {
            originalConsoleLog.apply(console, filteredArgs);
          }
        };

        console.warn = (...args) => {
          const filteredArgs = filterEventObjects(args);
          if (filteredArgs.length > 0) {
            originalConsoleWarn.apply(console, filteredArgs);
          }
        };

        console.error = (...args) => {
          const filteredArgs = filterEventObjects(args);
          if (filteredArgs.length > 0) {
            originalConsoleError.apply(console, filteredArgs);
          }
        };

        console.info = (...args) => {
          const filteredArgs = filterEventObjects(args);
          if (filteredArgs.length > 0) {
            originalConsoleInfo.apply(console, filteredArgs);
          }
        };

        console.debug = (...args) => {
          const filteredArgs = filterEventObjects(args);
          if (filteredArgs.length > 0) {
            originalConsoleDebug.apply(console, filteredArgs);
          }
        };

        return middlewares;
      },
    },
  }),
  infrastructureLogging: {
    level: "error",
    colors: false,
  },
  devtool: isProduction ? false : "eval-source-map",
};
