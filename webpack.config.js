const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const appHtmlTitle = 'Webpack Boilerplate';

const extractSass = new ExtractTextPlugin({
    filename: "style.bundle.css"
});

const paths = {
    DIST: path.join(__dirname, 'dist'),
    SRC: path.join(__dirname, 'app'),
    JS: path.join(__dirname, 'app/src')
};
/**
 * Webpack Configuration
 */
module.exports = {
    
    entry: path.join(paths.JS, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    devServer: {
      // contentBase: paths.DIST,
      // port: 9001,
      compress: true,
      hot: true,
      open: true
    },
    // entry: {
    //     vendor: [
    //         'lodash'
    //     ],
    //     bundle: path.join(dirApp, 'index')
    // },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new webpack.ProvidePlugin({
            // lodash
            '_': 'lodash'
        }),
        // new ExtractTextPlugin({filename: 'style.bundle.css', allChunks: true}),
        extractSass,
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.ejs'),
            // template: path.join(paths.SRC, 'index.html'),
            title: appHtmlTitle
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // use: ['babel-loader']
                use: {
                    loader: 'babel-loader',
                    options: {
                      cacheDirectory: true,
                      presets: ['react', 'env']
                    }
                }
            },
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            {
                test: /\.(mp4|mp3|svg|png|jpg|gif)$/,
                use: ['file-loader']
            },
            // STYLES
            // {
            //     test: /\.scss$/,
            //     use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            //             use: [
            //                 {
            //                     loader: "css-loader" // translates CSS into CommonJS
            //                 },
            //                 {
            //                     loader: "sass-loader" // compiles Sass to CSS
            //                 }
            //             ],
            //             fallback: "style-loader" // used when css not extracted
            //         }
            //     ))
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },
            // {
            //     test: /\.scss$/,
            //     use: extractSass.extract({
            //         use: [
            //             "css-loader",
            //             "sass-loader"
            //         ],
            //         fallback: "style-loader"
            //     })
            // },

            // EJS
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },

            // IMAGES
            {
                test: /\.(jpe*g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
