const fs = require('fs');
const path = require('path');
const { mkdir, readdir, copyFile } = require('fs/promises');
const distPath = path.join(__dirname, 'project-dist');
const htmlWriteStream = fs.createWriteStream(
  path.join(distPath, 'index.html'),
  'utf-8',
);
const cssWriteStream = fs.createWriteStream(
  path.join(distPath, 'style.css'),
  'utf-8',
);

mkdir(distPath, { recursive: true });

// Copy assets
readdir(path.join(__dirname, 'assets'), { recursive: true }).then((files) => {
  mkdir(path.join(distPath, 'assets'), { recursive: true });

  files.forEach((file) => {
    const ext = path.extname(file);
    if (ext) {
      copyFile(
        path.join(__dirname, 'assets', file),
        path.join(__dirname, 'project-dist', 'assets', file),
      );
    } else {
      mkdir(path.join(distPath, 'assets', file), { recursive: true });
    }
  });
});

// Build Styles
readdir(path.join(__dirname, 'styles'), { recursive: true }).then((files) => {
  files.forEach((file) => {
    const ext = path.extname(file);
    if (ext === '.css') {
      const fileAbsPath = path.join(__dirname, 'styles', file);

      const readStream = fs.createReadStream(fileAbsPath, 'utf-8');
      readStream.on('data', (chunk) => cssWriteStream.write(chunk));
    }
  });
});

// Build HTML
fs.writeFile(
  path.join(__dirname, 'project-dist', 'index.html'),
  '',
  (err, data) => {
    if (err) return console.error(err);
    return data;
  },
);

let htmlContent = '';
fs.readFile(
  path.join(__dirname, 'template.html'),
  { encoding: 'utf-8' },
  (err, fileContent) => {
    if (err) return console.error(err);

    htmlContent += fileContent;

    fs.readdir(
      path.join(__dirname, 'components'),
      { encoding: 'utf-8' },
      (err, files) => {
        if (err) return console.error(err);

        files.forEach((filename) => {
          fs.readFile(
            path.join(__dirname, 'components', filename),
            { encoding: 'utf-8' },
            (err, data) => {
              if (err) return console.error(err);

              const templateSelector = `{{${filename.slice(0, -5)}}}`;
              htmlContent = htmlContent.replaceAll(templateSelector, data);

              fs.writeFile(
                path.join(__dirname, 'project-dist', 'index.html'),
                '',
                (err, data) => {
                  if (err) return console.error(err);
                  return data;
                },
              );

              fs.writeFile(
                path.join(__dirname, 'project-dist', 'index.html'),
                htmlContent,
                (err, data) => {
                  if (err) return console.error(err);
                  return data;
                },
              );
            },
          );
        });
      },
    );

    htmlWriteStream.write(htmlContent, (err) => {
      if (err) return console.error(err);
    });
  },
);
