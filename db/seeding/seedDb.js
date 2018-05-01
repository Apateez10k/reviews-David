const fullList = require('./195-Zagat-AllData.json');
const Stores = require('./db/models/store.js');
const mongoose = require('mongoose');

const seedDb = (array) => {
  let counter = 0;

  var createList = () => {
    const obj = {
      place_id: array[counter].result.place_id,
      name: array[counter].result.name,
      reviews: array[counter].result.reviews,
      rating: array[counter].result.rating,
      price_level: array[counter].result.price_level,
      neighborhood: array[counter].result.address_components[2].long_name,
      city: array[counter].result.address_components[3].long_name,
      street: array[counter].result.address_components[1].long_name,
    };


    Stores.insertOne(obj, (err, content) => {
      if (err) {
        return err;
      }
      counter++;
      if (counter < array.length) {
        createList();
      } else {
        mongoose.disconnect();
        return counter;
      }
    });
  };

  Stores.clearDb(() => createList());
};

seedDb(fullList);
