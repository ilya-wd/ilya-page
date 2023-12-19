const fs = require('fs');
const path = require('path');
const markdownToHtml = require('./markdownToHtml');
const attachBlogContent = require('./attachBlogContent');

const markdownDirectory = '../blog_files/blogs_markdown';
const convertedHtmlDirectory = '../blog_files/partial_blogs_html';
const finalOutputDirectory = '../html/blogs_html';
const templateHtmlFile = '../html/templates-html/single-blog-template.html';

fs.readdirSync(markdownDirectory).forEach((file) => {
  if (file.endsWith('.md')) {
    const filePath = path.join(markdownDirectory, file);
    const htmlFilePath = path.join(
      convertedHtmlDirectory,
      path.basename(file, '.md') + '.html',
    );

    if (!fs.existsSync(htmlFilePath)) {
      markdownToHtml(filePath, convertedHtmlDirectory);
    }

    const finalOutputFilePath = path.join(
      finalOutputDirectory,
      path.basename(file, '.md') + '.html',
    );
    if (!fs.existsSync(finalOutputFilePath)) {
      attachBlogContent(htmlFilePath, finalOutputFilePath, templateHtmlFile);
    }
  }
});
