const path = require('path');

module.exports = {
    mode: 'development',
    entry: './shared/ts/script.ts',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },

    resolve: {
        extensions: [
            '.ts', '.js',
        ],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
};