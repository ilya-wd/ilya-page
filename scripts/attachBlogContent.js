const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const blogHtmlFile = './test.html';
const templateHtmlFile = '../html/single-blog-template.html';
const outputDirectory = './';
const outputHtmlFile = 'output.html';

function attachBlogContent() {
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

  const outputFileFullPath = path.join(outputDirectory, outputHtmlFile);
  fs.writeFileSync(outputFileFullPath, templateDom.serialize());
  console.log(`Blog content and TOC attached to ${outputFileFullPath}`);
}

attachBlogContent();
