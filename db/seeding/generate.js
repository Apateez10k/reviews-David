const generateData = require('./generateCore');

if (process.argv[2] === undefined) {
  console.log('File name not specified. Exiting...');
  process.exit();
}
if (process.argv[3] === undefined || Number.isNaN(Number(process.argv[3]))) {
  console.log('Object quantity not specified. Exiting...');
  process.exit();
}

generateData(process.argv[2], process.argv[3]);

