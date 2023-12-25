const fs = require('fs');
const path = require('path');

const foldersToClear = ['../html/blogs_html', '../blog_files/partial_blogs_html'];

foldersToClear.forEach((folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading folder ${folderPath}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      if (fs.statSync(filePath).isFile()) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          } else {
            console.log(`Deleted file ${filePath}`);
          }
        });
      }
    });
  });
});
