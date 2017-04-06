'use strict';
/* eslint-env es6 */

// const debug  = require('debug')('handlebars-markdown');
const marked     = require('marked');
const handlebars = require('handlebars');

const markdown = function (text, options) {
  if (options) {
    return marked(text || '');
  }
  else {
    /* eslint no-invalid-this:0 */
    options = text;
    return new handlebars.SafeString(marked(options.fn(this)));
  }
};

module.exports = markdown;
