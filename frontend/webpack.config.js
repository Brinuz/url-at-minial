const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    filename: './index.html',
    template: './src/index.html',
});

module.exports = {
    devServer: {
        watchOptions: {
            poll: true,
        },
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js|\.jsx$/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [htmlWebPackPlugin],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};