const { Client } = require('pg');

const client = new Client();
client.connect();

const findOne = (id) => {
  const storePrms = client.query('SELECT * FROM stores WHERE place_id = $1', [id])
    .then(res => res.rows[0]);
  const reviewsPrms = client.query('SELECT * FROM reviews WHERE stores_id = $1', [id])
    .then(res => res.rows);

  return Promise.all([storePrms, reviewsPrms])
    .then((results) => {
      const sendObj = results[0];
      [, sendObj.reviews] = results;
      return sendObj;
    });
};

const insertReview = review => (
  client.query('INSERT INTO reviews (stores_id, author_name, profile_photo_url, rating, relative_time_description, text) VALUES ($1, $2, $3, $4, $5, $6)', [
    review.stores_id,
    review.author_name,
    review.profile_photo_url,
    review.rating,
    review.relative_time_description,
    review.text,
  ])
);

exports.findOne = findOne;
exports.insertReview = insertReview;
exports.client = client;
