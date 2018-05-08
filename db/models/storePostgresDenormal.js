const { Client } = require('pg');

const client = new Client();
client.connect();

const findOne = id => (
  client.query('SELECT * FROM stores_denormal WHERE place_id = $1', [id])
    .then(res => res.rows[0])
);

const insertReview = (review) => {
  const id = review.stores_id;
  const modReview = review;
  delete modReview.stores_id;
  return client.query('SELECT reviews FROM stores_denormal WHERE place_id = $1', [id])
    .then((res) => {
      const { reviews } = res.rows[0];
      reviews.push(modReview);
      return client.query('UPDATE stores_denormal SET reviews = $1 WHERE place_id = $2', [JSON.stringify(reviews), id]);
    });
};

exports.insertReview = insertReview;
exports.findOne = findOne;
exports.client = client;
