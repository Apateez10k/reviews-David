const { Pool } = require('pg');

const pool = new Pool({ max: 30 });
pool.connect();

const findOne = id => (
  pool.query('SELECT * FROM stores_denormal WHERE place_id = $1', [id])
    .then(res => res.rows[0])
);

const insertReview = (review) => {
  const id = review.stores_id;
  const modReview = review;
  delete modReview.stores_id;
  return pool.query('SELECT reviews FROM stores_denormal WHERE place_id = $1', [id])
    .then((res) => {
      const { reviews } = res.rows[0];
      reviews.push(modReview);
      return pool.query('UPDATE stores_denormal SET reviews = $1 WHERE place_id = $2', [JSON.stringify(reviews), id]);
    });
};

exports.findOne = findOne;
exports.insertReview = insertReview;
exports.pool = pool;
