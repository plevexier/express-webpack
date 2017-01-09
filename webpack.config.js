var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV

var entry = {}, plugins = [];

console.log("loading env: " + env || "none");

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    entry = ['./src/main.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'];
    plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
} else if(process.env.NODE_ENV === "production") {
    entry = './src/main.js';
    plugins = [
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
            warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}

module.exports = {

    entry: entry,
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/dist'      
    },
    module: {  
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ],
        rules: [            
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }           
        ]
    },      
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#source-map',
    plugins: plugins     
}
