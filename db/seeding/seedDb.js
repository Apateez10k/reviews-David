const fullList = require('./195-Zagat-AllData.json');
const Stores = require('../models/store.js');
const mongoose = require('mongoose');

const seedDb = (array) => {
  let counter = 0;

  const createList = () => {
    const obj = {
      place_id: array[counter].place_id,
      name: array[counter].name,
      reviews: array[counter].reviews,
      rating: array[counter].rating,
      price_level: array[counter].price_level,
      neighborhood: array[counter].neighborhood,
      city: array[counter].city,
      street: array[counter].street,
    };

    Stores.insertOne(obj, (err) => {
      if (err) {
        throw err;
      }

      counter += 1;
      if (counter < array.length) {
        createList();
      } else {
        mongoose.disconnect();
        Stores.redisClient.quit();
      }
    });
  };

  Stores.clearDb(() => createList());
};

seedDb(fullList);

