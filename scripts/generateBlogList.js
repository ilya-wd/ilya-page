const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const blogsHtmlDir = '../html/blogs_html';
const templateHtmlFile = '../html/templates_html/blogs-main-template.html';
const outputHtmlFile = '../html/blogs-main.html';

function extractTitleFromHtml(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const h1 = dom.window.document.querySelector('h1');
  return h1 ? h1.textContent : 'No title';
}

function generateBlogList() {
  let htmlContent = '<ol class="list-decimal">\n';

  fs.readdirSync(blogsHtmlDir).forEach((file) => {
    if (file.endsWith('.html')) {
      const filePath = path.join(blogsHtmlDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const title = extractTitleFromHtml(fileContent);

      htmlContent += `<li class="mb-2"><a href="${filePath}" class="text-blue-600 hover:text-blue-800">${title}</a></li>\n`;
    }
  });

  htmlContent += '</ol>';

  const templateHtmlContent = fs.readFileSync(templateHtmlFile, 'utf8');
  const dom = new JSDOM(templateHtmlContent);
  const document = dom.window.document;

  const blogListElement = document.getElementById('list-of-blogs');
  if (blogListElement) {
    blogListElement.innerHTML = htmlContent;
    fs.writeFileSync(outputHtmlFile, dom.serialize());
    console.log(`Blog list updated in ${outputHtmlFile}`);
  } else {
    console.error(`Element with ID "list-of-blogs" not found in ${templateHtmlFile}`);
  }
}

generateBlogList();
