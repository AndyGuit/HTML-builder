const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
const { stdout, stdin } = process;

stdout.write(
  'Hello! Please write your text, that would be added to "text.txt" file\n',
);

stdin.on('data', (data) => {
  const dataString = data.toString();

  if (dataString.trim() === 'exit') {
    process.exit();
  }

  writeStream.write(dataString);
});

process.on('exit', () => {
  console.log('Bye bye! Have a nice day! :)');
});

process.on('SIGINT', () => {
  process.exit();
});
