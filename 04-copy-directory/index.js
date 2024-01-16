const path = require('path');
const { mkdir, readdir, copyFile } = require('fs/promises');

mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

readdir(path.join(__dirname, 'files')).then((files) => {
  files.forEach((file) =>
    copyFile(
      path.join(__dirname, 'files', file),
      path.join(__dirname, 'files-copy', file),
    ),
  );
});
