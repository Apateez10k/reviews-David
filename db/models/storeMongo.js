/* eslint no-console: 0 */
const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-reviews';
const mongoUrl = 'mongodb://localhost/apateez-reviews';

mongoose.connect(mongoUrl); // Try localhost first

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

const storeSchema = mongoose.Schema({
  place_id: {
    type: Number,
    unique: true,
  },
  name: String,
  price_level: Number,
  neighborhood: String,
  reviews: [],
  city: String,
  street: String,
  rating: Number,
});

const Store = mongoose.model('Store', storeSchema);

const findOne = id => Store.findOne({ place_id: id }).lean();

const insertOne = (store, callback) => {
  console.log('NEW STORE', store);
  Store.create(store, callback);
};

const insertReview = review => (
  Store.update({
    place_id: review.stores_id,
  }, {
    $push: { reviews: review },
  })
);

const clearDb = (cb) => {
  Store.remove({}, cb);
};

const disconnect = () => mongoose.disconnect();

exports.findOne = findOne;
exports.insertOne = insertOne;
exports.insertReview = insertReview;
exports.clearDb = clearDb;
exports.Model = Store;
exports.disconnect = disconnect;
