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
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'none', // Disable client-side logging completely
            overlay: {
                errors: false, // Disable error overlay which might cause event logging
                warnings: false,
            },
            progress: false, // Disable progress reporting
        },
        setupMiddlewares: (middlewares, devServer) => {
            // Enhanced console filtering for development environment
            const originalLog = console.log;
            const originalWarn = console.warn;
            const originalError = console.error;

            // Patterns to filter out third-party noise
            const filterPatterns = [
                '[mobx.array] Attempt to read an array index',
                '[Session Model]',
                'Wootric:',
                'Could not get cookie SecurityError',
                "Failed to read the 'cookie' property",
                'sandbox',
                'allow-same-origin',
                'hstc.utils',
                'trackConversion',
                'trackClickEvent',
                '_getUserInfo',
                '_generateURL',
                '_loadImage',
                'BuilderContent',
                'getContentWithInfo',
                'getCookie',
                'Firestore',
                'ERR_QUIC_PROTOCOL_ERROR',
            ];

            const shouldFilter = (message) => {
                if (typeof message === 'string') {
                    return filterPatterns.some((pattern) => message.includes(pattern));
                }
                if (typeof message === 'object' && message && message.constructor) {
                    return message.constructor.name === 'Event';
                }
                return false;
            };

            console.log = (...args) => {
                const filtered = args.filter((arg) => !shouldFilter(arg));
                if (filtered.length > 0 && !args.some((arg) => shouldFilter(arg))) {
                    originalLog.apply(console, filtered);
                }
            };

            console.warn = (...args) => {
                const filtered = args.filter((arg) => !shouldFilter(arg));
                if (filtered.length > 0 && !args.some((arg) => shouldFilter(arg))) {
                    originalWarn.apply(console, filtered);
                }
            };

            console.error = (...args) => {
                const messageStr = args.join(' ');
                // Only filter non-critical third-party errors, keep application errors
                if (
                    !shouldFilter(messageStr) ||
                    messageStr.includes('NeoCare360') ||
                    messageStr.includes('Application Error')
                ) {
                    originalError.apply(console, args);
                }
            };

            return middlewares;
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        allowedHosts: 'all',
    },
    devtool: 'eval-source-map',
});
