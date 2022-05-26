const path = require('path'); // node js, specific for path problem
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


function getStyleLoader(pre) {
    return [//first use css-loader, then use style-loader, from right to left, from bottom to up
        MiniCssExtractPlugin.loader,
        //"style-loader", // create style tag from js file, and make it effect in html
        "css-loader",   // compile css in commonjs module
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env"
                    ]
                }
            }
        },
        pre,
    ].filter(Boolean);// .filter(Boolean) is for filter undefine method
}

module.exports = {
    // entry
    entry: './src/main.js',

    // output
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: 'static/js/main.js',
        clean: true // clear first then build
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,//only check .css file
                use: getStyleLoader()
            },
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoader("stylus-loader")
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
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
        new CssMinimizerPlugin()
    ],
    // mode
    mode: "production",
}