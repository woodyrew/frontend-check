'use strict';
/* eslint-env es6 */

const marked = require('marked');
const renderer = new marked.Renderer();
renderer.image = function (href, title, text) {
  const attrs = [
    `alt="${text}"`
  ];
  attrs.push(`src="${href}"`);
  if (title === 'right') {
    attrs.push('class="float-right margin-left-small"');
  }
  else if (title === 'center') {
    attrs.push('class="text-center"');
  }
  else {
    attrs.push('class="float-left margin-right-small"');
    if (title) {
      attrs.push(`title="${title}"`);
    }
  }

  return `<img ${attrs.join(' ')}${this.options.xhtml ? '/>' : '>'}`;
};

module.exports = renderer;
