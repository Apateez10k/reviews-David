/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] no-console: 0 */
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const generateData = (filePath, amt, callback) => {
  const streamOptions = { highWaterMark: 64 * 1024 };
  const writeStream = fs.createWriteStream(path.join(__dirname, filePath), streamOptions);
  const genAmt = amt;
  const minReviews = 1;
  const maxReviews = 5;

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

    const reviewCount = getRandNum(minReviews, maxReviews);
    for (let i = 0; i < reviewCount; i++) {
      const fakeReview = {
        author_name: faker.name.findName(),
        profile_photo_url: faker.internet.avatar(),
        rating: getRandNum(1, 5),
        relative_time_description: getRandRelTime(),
        text: faker.lorem.sentences(),
      };
      fakeStore.reviews.push(fakeReview);
    }

    return fakeStore;
  };

  let i = 0;
  let canWrite = true;

  let fakeStore = createFakeStore(i);
  writeStream.write(`[${JSON.stringify(fakeStore)}`);
  i += 1;

  const writeInChunks = () => {
    while (i < genAmt && canWrite) {
      fakeStore = createFakeStore(i);
      canWrite = writeStream.write(`,\n${JSON.stringify(fakeStore)}`);
      i += 1;
    }
    if (i < genAmt) {
      canWrite = true;
      writeStream.once('drain', writeInChunks);
    } else {
      writeStream.write(']');
      writeStream.end();
      console.log('Generating complete!');
      console.timeEnd('Generation Time');
      writeStream.on('close', () => {
        if (callback) callback();
      });
    }
  };

  console.time('Generation Time');
  console.log('Starting...');
  const intervalId = setInterval(() => {
    if (i >= genAmt) {
      clearInterval(intervalId);
    }
    console.log(i, 'entries generated...');
  }, 10000);

  writeInChunks();
};

module.exports = generateData;

