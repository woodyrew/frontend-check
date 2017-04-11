'use strict';
/* eslint-env es6 */

const debug_lib = require('debug');
const debug     = debug_lib('nuxeo-truncate');

const truncate = function (text, number_of_words) {
  debug('Debugging truncate');
  return text.split(' ').slice(0, number_of_words).join(' ');
};

module.exports = truncate;
