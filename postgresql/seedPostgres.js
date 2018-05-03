const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

if (process.argv[2] === undefined) {
  console.log('File path not specified. Exiting...');
  process.exit();
}

const readStream = fs.createReadStream(path.join(__dirname, process.argv[2]));

readStream
  .pipe(JSONStream.parse('*'))
  .on('data', data => console.log(data));
