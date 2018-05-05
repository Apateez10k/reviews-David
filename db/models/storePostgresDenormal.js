const { Client } = require('pg');

const client = new Client();
client.connect();

const findOne = id => (
  client.query('SELECT * FROM stores_denormal WHERE place_id = $1', [id])
    .then(res => res.rows[0])
);

exports.findOne = findOne;
exports.client = client;
