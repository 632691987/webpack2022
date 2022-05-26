const path = require('path'); // node js, specific for path problem
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry
    entry: './src/main.js',

    // output
    output: {
        path: undefined,
        filename: 'static/js/main.js',
        clean: true // clear first then build
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,//only check .css file
                use: [//first use css-loader, then use style-loader, from right to left, from bottom to up
                    "style-loader", // create style tag from js file, and make it effect in html
                    "css-loader",   // compile css in commonjs module
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {//this image loader plugin already bound
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",//possible to change to base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10*1024
                    }
                },
                generator: {
                    //hash value only get first 10 bit
                    filename: "static/images/[hash:10][ext][query]"
                }
            },
            {//this is for handle all other resource, will direct copy
                test: /\.(woff|woff2|map3|mp4)$/,
                type: "asset/resource",//direct copy, not change to base64
                generator: {
                    //hash value only get first 10 bit
                    filename: "static/media/[hash:10][ext][query]"
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            }
        ],
    },

    //plugins
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpackPlugin({
            // Able to copy content, otherwise everything not copied
            template: path.resolve(__dirname, '../public/index.html'),
        })
    ],
    devServer: {
        host: "localhost",
        port: "3000",
        open: true
    },
    // mode
    mode: "development",
}