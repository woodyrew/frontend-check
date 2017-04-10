'use strict';
/* eslint-env es6 */

const truncate = function (text, number_of_words) {
  return text.split(' ').slice(0, number_of_words).join(' ');
};

module.exports = truncate;
