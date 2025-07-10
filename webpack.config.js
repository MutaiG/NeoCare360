const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            // Main application bundle
            main: './appserver/static/src/index.js',

            // Individual component bundles for Splunk views
            overview: './appserver/static/src/main/webapp/components/overview-bundle.js',
            'patient-monitoring':
                './appserver/static/src/main/webapp/components/patient-monitoring-bundle.js',
            'icu-command-center':
                './appserver/static/src/main/webapp/components/icu-command-center-bundle.js',
            'clinical-kpis':
                './appserver/static/src/main/webapp/components/clinical-kpis-bundle.js',
        },

        output: {
            path: path.resolve(__dirname, 'appserver/static/build'),
            filename: 'js/[name].js',
            publicPath: '/',
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
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]',
                    },
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, 'appserver/static/src'),
                '@components': path.resolve(
                    __dirname,
                    'appserver/static/src/main/webapp/components'
                ),
                '@services': path.resolve(__dirname, 'appserver/static/src/services'),
                '@contexts': path.resolve(__dirname, 'appserver/static/src/contexts'),
                '@data': path.resolve(__dirname, 'appserver/static/src/data'),
            },
        },

        plugins: [
            // Generate index.html for standalone development
            new HtmlWebpackPlugin({
                template: './appserver/static/demo/standalone/index.html',
                filename: 'index.html',
                chunks: ['main'],
                inject: 'body',
                title: 'NeoCare360 - Healthcare Intelligence Platform',
            }),
        ],

        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        filename: 'js/vendors.js',
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        filename: 'js/common.js',
                    },
                },
            },
        },

        devServer: {
            port: 8080,
            hot: true,
            historyApiFallback: true,
            compress: true,
            allowedHosts: 'all',
            open: false,
            client: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },

        devtool: isProduction ? 'source-map' : 'eval-source-map',

        // Splunk-specific externals (if Splunk libraries are available globally)
        externals: {
            'splunk-js-sdk': 'SplunkJSSDK',
            jquery: 'jQuery',
        },
    };
};
