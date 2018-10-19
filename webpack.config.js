const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    entry: {
        index: [
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
            "./public/index"
        ]
    },
    output: {
        filename: 'app.min.js',
        path: __dirname + '/dist',
        publicPath: '/dist'
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: ["style", "css?modules&localIdentName=[name]---[local]---[hash:base64:5]"]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/views/index.html'
        })
    ]
};
module.exports = config;