const fs = require("fs");
const path = require("path");
const webpack = require('webpack');

const globalConfig = env => ({
	resolve: { extensions: [",", ".ts", ".tsx", ".js"] },
	module: {
		rules: [
			{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
			{ test: /\.js$/, loader: "source-map-loader" },
		]
	},
	plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
	devtool: env.production ? 'none' : 'source-map',
});

const nodeConfig = env => ({
	target: 'node',
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	},
	externals: fs.readdirSync("node_modules").reduce(function (acc, mod) {
		if (mod === ".bin") { return acc; }
		acc[mod] = "commonjs " + mod;
		return acc;
	}, {}),
});

module.exports = env => [{
	...globalConfig(env),
	entry: { client: './src/client/index.tsx', },
	output: {
		path: path.join(__dirname, 'public', 'build'),
		publicPath: "/build/",
		chunkFilename: "[name]." + (env.production ? "[hash]." : "") + "bundle.js",
		filename: "[name].bundle.js"
	},
}, {
	...globalConfig(env),
	...nodeConfig(env),
	entry: { server: './src/server/index.tsx', },
	output: {
		path: path.join(__dirname, 'bin', 'build'),
		filename: '[name].bundle.js',
	},
}];