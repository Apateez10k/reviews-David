/* eslint no-console: 0 */
const { promisify } = require('util');
const mongoose = require('mongoose');
const redis = require('redis');

const dbUrl = process.env.DB_URL || 'localhost'
const redisClient = redis.createClient({ host: dbUrl });
redisClient.on('ready', () => console.log('Redis connected...'));

const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);

const dockerUri = 'mongodb://database/apateez-reviews';
const localUri = `mongodb://${dbUrl}/apateez-reviews`;

mongoose.connect(localUri);
mongoose.connection.on('connected', () => console.log('Mongoose connection open'));
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(dockerUri, {
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    auth: { authdb: 'admin' },
  });
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

const findOne = id => (
  redisGet(id)
    .then((data) => {
      if (data === null) {
        return Store.findOne({ place_id: id }).lean()
          .then((mongoData) => {
            redisSet(id, JSON.stringify(mongoData), 'EX', 10);
            return mongoData;
          });
      }
      return JSON.parse(data);
    })
);

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
