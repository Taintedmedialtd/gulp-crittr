'use strict';

const Crittr = require('crittr');
const Buffer = require('buffer');
const { PluginError } = require('gulp-util');
const through = require('through2');

module.exports = (opts) => {
	const options = Object.assign({
		out: 'critical.css',
		urls: [],
		width: 1920,
		height: 1080,
	}, opts || {});

	const {
		urls,
		width,
		height,
	} = options;

	const buildCriticalCss = (f, something, callback) => {
		const file = f;
		if (!file || !file.contents) return callback(null, file);

		if (file.isStream()) {
			this.emit('error', new PluginError('Streaming not supported!'));
			return callback(null, file);
		}

		return Crittr({
			urls,
			css: file.contents,
			device: {
				width,
				height,
			},
		})
			.then((extractedCss) => {
				file.contents = Buffer.from(extractedCss, 'utf-8');
				file.path = file.base + options.out;
				callback(null, file);
			})
			.catch(err => callback(err));
	};

	return through.obj(buildCriticalCss);
};
