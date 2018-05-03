/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');
const { Client } = require('pg');

if (process.argv[2] === undefined) {
  console.log('File path not specified. Exiting...');
  process.exit();
}

console.log('Inserting...');
console.time('Insertion time');

const readStream = fs.createReadStream(path.join(__dirname, process.argv[2]));
const storeTxt = 'INSERT INTO stores(name, price_level, neighborhood, city, street, rating) VALUES($1, $2, $3, $4, $5, $6)';
const reviewTxt = 'INSERT INTO reviews(stores_id, author_name, profile_photo_url, rating, relative_time_description, text) VALUES($1, $2, $3, $4, $5, $6)';
const client = new Client({
  database: 'stores',
});
client.connect();

let queries = 0;
const handleQueries = () => {
  queries -= 1;
  if (queries <= 0) {
    console.log('Completed!');
    console.timeEnd('Insertion time');
    client.end();
  }
};

const prepareQueries = (store) => {
  const storeValues = [
    store.name,
    store.price_level,
    store.neighborhood,
    store.city,
    store.street,
    Math.round(store.rating),
  ];
  queries += 1;
  client.query(storeTxt, storeValues)
    .then(handleQueries);

  store.reviews.forEach((review) => {
    const reviewValues = [
      review.stores_id,
      review.author_name,
      review.profile_photo_url,
      review.rating,
      review.relative_time_description,
      review.text,
    ];
    queries += 1;
    client.query(reviewTxt, reviewValues)
      .then(handleQueries);
  });
};

readStream
  .pipe(JSONStream.parse('*'))
  .on('data', data => prepareQueries(data));

