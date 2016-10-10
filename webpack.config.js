var webpack = require('webpack');
var HtmlWebPack = require('html-webpack-plugin');

module.exports = {
    entry:'./src/ts/main.ts',
    output:{
        path:'./dist/js',
        filename: 'app.bundle.js'        
    },
    module:{
        loaders:[
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve:{
        extensions:['','.js','.ts']
    },
    plugins:[
              
    ]
};