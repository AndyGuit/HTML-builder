const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const secretFolderAbsPath = path.join(__dirname, 'secret-folder');

async function logFiles() {
  try {
    const content = await readdir(secretFolderAbsPath, { withFileTypes: true });
    content.forEach((item) => {
      const itemAbsPath = path.join(item.path, item.name);
      fs.lstat(itemAbsPath, (err, stats) => {
        if (err) return console.error(err);

        if (stats.isFile()) {
          const [filename, ext] = item.name.split('.');
          const sizeKb = Math.round(stats.size * 0.001 * 100) / 100;
          console.log(`<${filename}>-<${ext}>-<${sizeKb}kb>`);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}
logFiles();
