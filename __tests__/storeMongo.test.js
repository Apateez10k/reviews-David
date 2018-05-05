const mongoose = require('mongoose');
const db = require('./../db/models/storeMongo.js');
// Notes:
// 1. Data must be seeded into Mongodb by running npm run seed.
// 2. Mongodb must be started by using mongod from terminal
// 3. use database 'apateez'

var place_id = 2;

test('the data has a place_id', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data.place_id !== undefined).toBe(true);
  });
});

test('the data.reviews is an array', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(Array.isArray(data.reviews)).toBe(true);
  });
});

test('the data.reviews has at least 1 reviews', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data.reviews.length).toBeGreaterThanOrEqual(1);
  });
});

test('the data.rating exists', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(!!data.rating).toBe(true);
  });
});

afterAll(() => {
  mongoose.disconnect();
});
