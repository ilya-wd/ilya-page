// convert.js
const fs = require('fs');
const path = require('path');
const markdownit = require('markdown-it');
const markdownitAnchor = require('markdown-it-anchor');
const markdownitAttrs = require('markdown-it-attrs');
const markdownitToc = require('markdown-it-table-of-contents');
const markdownitExpandable = require('markdown-it-expandable');

const md = new markdownit();
md.use(markdownitAnchor.default);
md.use(markdownitAttrs);
md.use(markdownitToc);
md.use(markdownitExpandable);

function convertMarkdownToHtml(fileName) {
  const markdown = fs.readFileSync(fileName, 'utf8');
  const html = md.render(markdown);
  const htmlFileName = path.basename(fileName, '.md') + '.html';
  fs.writeFileSync(htmlFileName, html);
  console.log(`Converted ${fileName} to ${htmlFileName}`);
}

convertMarkdownToHtml('../blog_files/blogs_markdown/test.md');
