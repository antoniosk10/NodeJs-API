// const path = require("path");
// const dotenv = require("dotenv").config({
//     path: path.join(__dirname, ".env"),
// });
// const webpack = require("webpack");
// const nodeExternals = require("webpack-node-externals");
import path from "path";
import dotenv from "dotenv";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: path.join(__dirname, ".env")});

export default {
    mode: "production",
    entry: "./server.js",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed,
        }),
    ],
    externals: [nodeExternals()],
};

// import path from "path";
// import dotenv from "dotenv";
// import webpack from "webpack";
// import nodeExternals from "webpack-node-externals";
// import {dirname} from "path";
// import {fileURLToPath} from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config({path: path.join(__dirname, ".env")});

// module.exports = {
//     mode: "production",
//     entry: "./server.js",
//     output: {
//         filename: "build.js",
//         path: path.resolve(__dirname, "dist"),
//     },
//     target: "node",
//     plugins: [
//         new webpack.DefinePlugin({
//             "process.env": dotenv.parsed,
//         }),
//     ],
//     externals: [nodeExternals()],
// };
