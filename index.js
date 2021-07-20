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

		const css = file.contents.toString();

		return Crittr({
			urls,
			css,
			device: {
				width,
				height,
			},
		})
			.then((extractedCss) => {
				/* eslint-disable-next-line no-buffer-constructor */
				file.contents = new Buffer(extractedCss);
				file.path = file.base + options.out;
				callback(null, file);
			})
			.catch(err => callback(err));
	};

	return through.obj(buildCriticalCss);
};
