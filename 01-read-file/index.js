const fs = require('fs');
const path = require('path');

fs.createReadStream(path.resolve(__dirname, 'text.txt'), {
  encoding: 'utf-8',
}).on('data', (chunk) => {
  console.log(chunk);
});
