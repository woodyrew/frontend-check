'use strict';
/* eslint-env es6 */
/* eslint no-console: 0 */

// Assume production if set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Debugging
if (!process.env.DEBUG) {
  process.env.DEBUG = '*:error';
}

const debug_lib = require('debug');
const debug     = debug_lib('nuxeo-build');
const error     = debug_lib('nuxeo-build:error');

// npm packages
const path        = require('path');
const yaml_config = require('node-yaml-config');
const extend      = require('lodash.assignin');

// npm metalsmith packages
const metalsmith     = require('metalsmith');
const collections    = require('metalsmith-collections');
const default_values = require('metalsmith-default-values');
const frontmatter    = require('metalsmith-matters');
const in_place       = require('metalsmith-in-place');
const layouts        = require('metalsmith-layouts');
const markdown       = require('metalsmith-markdown');
const permalinks     = require('metalsmith-permalinks');

// local packages
const renderer                     = require('./modules/markdown_renderer');

// get config
const config = yaml_config.load(path.join(__dirname, '/config.yml'));

const handlebars_helpers = {
  head_title: require('./modules/handlebars/head_title'),
  md        : require('./modules/handlebars/markdown')
};

debug('Config: %o', config);

console.time('Built');

metalsmith(__dirname)
  .source('./src')
  // Check frontmatter is not malformed
  .frontmatter(false)
  .use(frontmatter({
    strict: true
  }))
  // Standard site processing
  .metadata({
    site: config.site
  })
  .use(default_values(config.page_defaults))
  .use(collections({
    blog: {
      sortBy : 'post_date',
      reverse: true
    }
  }))
  .use(in_place({
    pattern : '**/*',
    engine  : 'handlebars',
    partials: 'layouts/partials',
    helpers : handlebars_helpers
  }))
  .use(markdown(extend(config.markdown_options, {
    renderer : renderer,
    highlight: code => require('highlight.js').highlightAuto(code).value
  })))
  .use(layouts({
    engine   : 'handlebars',
    directory: 'layouts',
    partials : 'layouts/partials',
    helpers  : handlebars_helpers
  }))
  .use(permalinks({
    relative: false
  }))
  .destination('./site')
  .build((err) => {
    // For error handling
    if (err) {
      error(err);
      throw err;
    }
    console.timeEnd('Built');
  });
