/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] no-console: 0 */
const fs = require('fs');
const path = require('path');
const faker = require('faker');

if (process.argv[2] === undefined) {
  console.log('File name not specified. Exiting...');
  process.exit();
}
if (process.argv[3] === undefined || Number.isNaN(Number(process.argv[3]))) {
  console.log('Object quantity not specified. Exiting...');
  process.exit();
}

const writeStream = fs.createWriteStream(path.join(__dirname, process.argv[2]));
const genAmt = process.argv[3];
const maxReviews = 10;

const getRandNum = (min, max) => Math.floor(Math.random() * Math.floor((max + 1) - min)) + min;
const getRandRelTime = () => {
  const text = [
    'a day ago',
    '2 days ago',
    '3 days ago',
    '4 days ago',
    '5 days ago',
    '6 days ago',
    'a week ago',
    '2 weeks ago',
    '3 weeks ago',
    'a month ago',
    '2 months ago',
    '3 months ago',
  ];

  return text[getRandNum(0, text.length - 1)];
};

const createFakeStore = (id) => {
  const fakeStore = {
    place_id: id,
    name: faker.company.companyName(),
    price_level: getRandNum(1, 4),
    neighborhood: faker.address.city(),
    reviews: [],
    city: faker.address.city(),
    street: faker.address.streetAddress(),
    rating: getRandNum(0, 50) / 10,
  };

  const reviewCount = getRandNum(1, maxReviews);
  for (let i = 0; i < reviewCount; i++) {
    const fakeReview = {
      author_name: faker.name.findName(),
      profile_photo_url: faker.internet.avatar(),
      rating: getRandNum(1, 5),
      relative_time_description: getRandRelTime(),
      text: faker.lorem.paragraphs(),
    };
    fakeStore.reviews.push(fakeReview);
  }

  return fakeStore;
};

let i = 0;
let canWrite = true;

const writeInChunks = () => {
  while (i < genAmt && canWrite) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Inserting ${i + 1}...`);

    const fakeStore = createFakeStore(i);
    canWrite = writeStream.write(JSON.stringify(fakeStore, null, 2));
    i += 1;
  }
  if (i < genAmt) {
    canWrite = true;
    writeStream.once('drain', writeInChunks);
  } else {
    process.stdout.write('\nGenerating complete!\n');
  }
};

writeInChunks();

