# gulp-crittr
A super simple package to add crittr to gulp for creating critical CSS files from multiple URL's.

Inspired by gulp-penthouse.

## Installation

```
npm i gulp-crittr --save-dev
```

## Basic Usage

```js
const gulp = require('gulp');
const crittr = require('gulp-crittr');

gulp.task('crittr', () => {
	return gulp.src('public/styles.css')
		.pipe(crittr({
			out: 'critical.css',
			urls: [
				'http://localhost:8888',
				'http://localhost:8888/product/list/',
				'http://localhost:8888/product/view',
				'http://localhost:8888/landing/page',
			],
			width: 1360,
			height: 900
		}))
		.pipe(gulp.dest('public/'));
})
```

## Options

```
{
	out: 'critical.css', // Output file name
	urls: [], // Array of URL's to fetch critical CSS for
	width: 1920, // Width to render
	height: 1080, // Height to render
}

```
