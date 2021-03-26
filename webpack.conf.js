const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
process.env.NODE_ENV = 'development';

module.exports = {

    entry: resolveAppPath('src'),
    mode: 'development',

    output: {
        filename: 'static/js/bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: resolveAppPath('src'),
                loader: 'babel-loader',
                options: {
                    presets: [
                        require.resolve('babel-preset-react-app')
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveAppPath('public/index.html')
        }),
        new webpack.ProvidePlugin({
            React: "react"
        })
    ],
    devServer: {
        contentBase: resolveAppPath('public'),
        publicPath: '/',
        hot: true,
        port: 3000,
        proxy: {
            '/v1/**': {
                target: 'http://localhost:8080'
            }
        }
    }
};