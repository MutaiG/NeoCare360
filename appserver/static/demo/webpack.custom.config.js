const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const title = 'NeoCare360 - Clinical Intelligence Hub';

module.exports = {
    mode: 'development',
    entry: {
        demo: path.join(__dirname, 'demo.jsx'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // Alias for local packages
            '@splunk/overview': path.resolve(__dirname, '../../overview'),
            '@splunk/patient-monitoring': path.resolve(__dirname, '../../patient-monitoring'),
            '@splunk/icu-command-center': path.resolve(__dirname, '../../icu-command-center'),
            '@splunk/clinical-kp-is': path.resolve(__dirname, '../../clinical-kp-is'),
            '@splunk/resource-management': path.resolve(__dirname, '../../resource-management'),
        },
    },
    externals: {
        // Keep Splunk dependencies as externals to avoid bundling issues
        '@splunk/react-ui': '@splunk/react-ui',
        '@splunk/themes': '@splunk/themes',
        '@splunk/react-page': '@splunk/react-page',
        '@splunk/splunk-utils': '@splunk/splunk-utils',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title,
            template: path.join(__dirname, 'standalone/index.html'),
        }),
    ],
    devServer: {
        port: 8081,
        open: false, // Don't auto-open browser to reduce logging
        hot: false, // Disable hot reload temporarily to isolate issue
        liveReload: true, // Use live reload instead
        historyApiFallback: true,
        client: {
            logging: 'none', // Completely disable client logging
            overlay: false, // Disable error overlay
            progress: false, // Disable progress
            reconnect: false, // Disable auto-reconnect
        },
        static: {
            directory: path.join(__dirname, 'public'),
            publicPath: '/',
        },
        compress: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // Custom middleware to suppress all logging
        setupMiddlewares: (middlewares, devServer) => {
            // Override the webpack-dev-server's internal logging
            const originalWrite = process.stdout.write;
            const originalErrorWrite = process.stderr.write;

            process.stdout.write = function (chunk, encoding, callback) {
                const str = chunk.toString();
                // Filter out [object Event] messages
                if (!str.includes('[object Event]') && !str.includes('webpack-dev-server')) {
                    return originalWrite.call(this, chunk, encoding, callback);
                }
                if (callback) callback();
                return true;
            };

            process.stderr.write = function (chunk, encoding, callback) {
                const str = chunk.toString();
                // Filter out [object Event] messages
                if (!str.includes('[object Event]') && !str.includes('webpack-dev-server')) {
                    return originalErrorWrite.call(this, chunk, encoding, callback);
                }
                if (callback) callback();
                return true;
            };

            return middlewares;
        },
    },
    devtool: 'eval-source-map',
    stats: 'minimal', // Reduce webpack output
    infrastructureLogging: {
        level: 'none', // Disable infrastructure logging
    },
};
