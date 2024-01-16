const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const stylesAbsPath = path.join(__dirname, 'styles');
const bundleAbsPath = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(bundleAbsPath, 'utf-8');

readdir(stylesAbsPath).then((data) => {
  data.forEach((item) => {
    const ext = path.extname(item);
    if (ext === '.css') {
      const itemAbsPath = path.join(stylesAbsPath, item);

      const readStream = fs.createReadStream(itemAbsPath, 'utf-8');
      readStream.on('data', (chunk) => writeStream.write(chunk));
    }
  });
});
