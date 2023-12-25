const fs = require('fs');
const path = require('path');
const markdownit = require('markdown-it');
const markdownitAnchor = require('markdown-it-anchor');
const markdownitAttrs = require('markdown-it-attrs');
const markdownitToc = require('markdown-it-table-of-contents');
const markdownitExpandable = require('markdown-it-expandable');
const markdownitHighlightJS = require('markdown-it-highlightjs');
const markdownitIgnore = require('markdown-it-ignore');

const md = new markdownit();
// md.use(markdownitIgnore, { pattern: /^:::.*\n/gm });
// md.use(markdownitIgnore, [':::']);
md.use(markdownitIgnore);
md.use(markdownitAnchor.default);
md.use(markdownitHighlightJS, { inline: true });
md.use(markdownitAttrs);
md.use(markdownitToc, {
  includeLevel: [1, 2, 3],
  listType: 'ol',
});
md.use(markdownitExpandable);

function markdownToHtml(fileName, outputDirectory) {
  const markdown = fs.readFileSync(fileName, 'utf8');
  const html = md.render(markdown);
  const htmlFileName = path.basename(fileName, '.md') + '.html';
  fs.writeFileSync(path.join(outputDirectory, htmlFileName), html);
  console.log(`Converted ${fileName} to ${htmlFileName}`);
}

module.exports = markdownToHtml;
