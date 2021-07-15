# @gulp-plugin/eol ![npm (custom registry)](https://img.shields.io/npm/v/@gulp-plugin/eol?logo=npm) [![GitHub Package Registry version](https://img.shields.io/github/release/gulp-plugin/eol.svg?label=gpr&logo=github)](https://github.com/gulp-plugin/eol/packages/)


[![Build](https://github.com/gulp-plugin/eol/actions/workflows/node.js.yml/badge.svg)](https://github.com/gulp-plugin/eol/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/gulp-plugin/eol/badge.svg?branch=master)](https://coveralls.io/github/gulp-plugin/eol?branch=master) [![dependencies Status](https://david-dm.org/gulp-plugin/eol/status.svg)](https://david-dm.org/gulp-plugin/eol)

Gulp plugin to ensure consistent end of line characters.

## Install

`npm install --save-dev @gulp-plugin/eol`

## Usage

```typescript

const typescript = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const eol = require('gulp-plugin/eol')

const project = typescript.createProject('tsconfig.json')


function build() {
  src('./src/**/*.ts')
    .pipe(eol({ eol: '\n' }))
    .pipe(sourcemaps.init())
    .pipe(project())

  return compiled.js
    .pipe(sourcemaps.write({ sourceRoot: file => path.relative(path.join(file.cwd, file.path), file.base) }))
    .pipe(dest('build/'))
}

```
