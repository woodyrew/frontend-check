'use strict';
/* eslint-env es6 */

const head_title = function (options) {
  const title = options.hash.title || options.data.root.title;

  return (title) ? `${title} | ${options.data.root.site.name}` : options.data.root.site.name;
};

module.exports = head_title;
