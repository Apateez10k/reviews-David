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

exports.findOne = findOne;
exports.client = client;
