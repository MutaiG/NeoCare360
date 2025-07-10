const path = require('path');
const { merge: webpackMerge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('@splunk/webpack-configs/base.config').default;

const title = 'NeoCare360 - Clinical Intelligence Hub';

module.exports = webpackMerge(baseConfig, {
    entry: {
        demo: path.join(__dirname, 'demo.jsx'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title,
            template: path.join(__dirname, 'standalone/index.html'),
        }),
    ],
    devServer: {
        port: 3001,
        open: false,
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        allowedHosts: 'all',
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        client: {
            logging: 'none',
            overlay: {
                errors: false,
                warnings: false,
            },
            progress: false,
        },
        setupMiddlewares: (middlewares, devServer) => {
            // Suppress event object logging
            const originalConsoleLog = console.log;
            const originalConsoleWarn = console.warn;
            const originalConsoleError = console.error;

            const filterEventObjects = (args) => {
                return args.filter((arg) => {
                    // Filter out [object Event] logs
                    if (typeof arg === 'object' && arg !== null) {
                        const objString = Object.prototype.toString.call(arg);
                        if (
                            objString === '[object Event]' ||
                            objString === '[object MouseEvent]' ||
                            objString === '[object KeyboardEvent]' ||
                            (arg.constructor &&
                                arg.constructor.name &&
                                arg.constructor.name.includes('Event'))
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

            return middlewares;
        },
    },
    devtool: 'eval-source-map',
});
