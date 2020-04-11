const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    filename: "./index.html",
    template: "./src/index.html",
    favicon: "./src/images/favicon.png",
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
                    loader: "babel-loader",
                },
            },
            {
                exclude: /node_modules/,
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: {
                    loader: "file-loader",
                },
            },
        ],
    },
    plugins: [htmlWebPackPlugin],
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
