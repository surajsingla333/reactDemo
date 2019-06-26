var path = require('path');

const webpack = require('webpack');

module.exports = {
    
    // mode: 'development',

    entry: {
        app: './src/app.js',
    },

    devServer: {
        historyApiFallback: true,
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    watch: true,

    // performance: { hints: false },

    module:{
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    query:{
                        presets: ['@babel/preset-env', '@babel/react']
                    }
                }]
            }
        ]
    }
}