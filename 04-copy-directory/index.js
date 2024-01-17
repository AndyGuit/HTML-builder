const path = require('path');
const { mkdir, readdir, copyFile, unlink } = require('fs/promises');
const filesPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

mkdir(copyPath, { recursive: true });

async function copyFiles() {
  const files = await readdir(path.join(__dirname, 'files'));
  const filesCopy = await readdir(copyPath);

  // clear directory
  for await (const copy of filesCopy) {
    await unlink(path.join(copyPath, copy));
  }

  files.forEach((file) =>
    copyFile(path.join(filesPath, file), path.join(copyPath, file)),
  );
}
copyFiles();
