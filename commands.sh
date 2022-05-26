# preparation, install node 16+

npm install webpack webpack-cli -D


#when download webpack finish, there will be some files in the /node_modules, and you can run npx to trigger the webpack
npx webpack ./src/main.js --mode=development
npx webpack ./src/main.js --mode=production

# then you can add a webpack.config.js, inside has main webpack config, then you can direct use npx webpack
npx webpack


#############################################################

# handle css resources
npm install --save-dev css-loader
npm install --save-dev style-loader

# handle less resources
npm install less less-loader --save-dev

# handle sass resources
npm install sass-loader sass -D

# handle stylus resources
npm install stylus-loader -D


# install additional plugin
npm install eslint-webpack-plugin --save-dev
# then add following in webpack.config.js, and following:

#    plugins: [
#        new ESLintPlugin({
#            context: path.resolve(__dirname, 'src')
#        })
#    ],

# and add .eslintrc.js and .eslintignore


# install babel-loader
https://webpack.docschina.org/loaders/babel-loader/

npm install -D babel-loader @babel/core @babel/preset-env


# introduce HtmlWebpackPlugin in purpose of auto load into html


# Everything in auto
npm install webpack-dev-server -D
# from now on, use ```npx webpack serve```


#PS: "serve means use devServer inside, if in production mode, no need to use serve, because no devServer"
npx webpack serve --config ./config/webpack.dev.js
npx webpack --config ./config/webpack.prod.js



# In package.json file, in scripts/dev part, no need to use npx begin, because default call by it
#{
#  "name": "webpack2022",
#  "version": "1.0.0",
#  "description": "",
#  "main": "./src/main.js",
#  "scripts": {
#    "dev": "webpack serve --config ./config/webpack.dev.js",
#    "test": "echo \"Error: no test specified\" && exit 1"
#  },
#  .....
#}


# You could write in package.json to run npx
#  "scripts": {
#    "start": "npm run dev",
#    "dev": "webpack serve --config ./config/webpack.dev.js",
#    "build": "webpack serve --config ./config/webpack.prod.js"
#  },

#from now on, you can use npm start / npm dev / npm build





#https://webpack.docschina.org/plugins/mini-css-extract-plugin
# extract as standalone file, and must disable "style-loader"

# for install css compatible
#npm install postcss-loader postcss postcss-preset-env -D

#and when setup in webpack.config.js, must put it after "css-loader"
#{
#    loader: "postcss-loader",
#    options: {
#        postcssOptions: {
#            plugins: [
#                "postcss-preset-env"
#            ]
#        }
#    }
#}




#https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
# css compress
