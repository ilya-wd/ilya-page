const fs = require('fs');
const { JSDOM } = require('jsdom');

function attachBlogContent(blogHtmlFile, outputHtmlFile, templateHtmlFile) {
  const blogHtmlContent = fs.readFileSync(blogHtmlFile, 'utf8');
  const blogDom = new JSDOM(blogHtmlContent);
  const blogDocument = blogDom.window.document;

  const tocElement = blogDocument.querySelector('.table-of-contents');
  const blogContent = blogDocument.body.innerHTML;

  if (tocElement) {
    tocElement.remove();
  }

  const templateHtmlContent = fs.readFileSync(templateHtmlFile, 'utf8');
  const templateDom = new JSDOM(templateHtmlContent);
  const document = templateDom.window.document;

  const tocLocationElement = document.getElementById('toc-location');
  const blogContentElement = document.getElementById('blog-content');

  if (tocLocationElement && tocElement) {
    tocLocationElement.innerHTML = tocElement.outerHTML;
  } else {
    console.error('TOC element or TOC location not found.');
  }

  if (blogContentElement) {
    blogContentElement.innerHTML = blogContent;
  } else {
    console.error('Blog content element not found.');
  }

  fs.writeFileSync(outputHtmlFile, templateDom.serialize());
  console.log(`Blog content and TOC attached to ${outputHtmlFile}`);
}

module.exports = attachBlogContent;
