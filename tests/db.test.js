const db = require('./../db/models/store.js');
// Notes:
// 1. Data must be seeded into Mongodb by running npm run seed.
// 2. Mongodb must be started by using mongod from terminal
// 3. use database 'apateez'

var place_id = 0;

test('the data is an array', () => {
  expect.assertions(1);
  return db.findOne(place_id).then((data) => {
    expect(Array.isArray(data)).toBe(true);
  });
});

test('the data is an array of length 1', () => {
  expect.assertions(1);
  return db.findOne(place_id).then((data) => {
    expect(data.length).toBe(1);
  });
});

test('the data has a place_id', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data[0].place_id !== undefined).toBe(true);
  });
});

test('the data[0].reviews is an array', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(Array.isArray(data[0].reviews)).toBe(true);
  });
});

test('the data[0].reviews has at least 5 reviews', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(data[0].reviews.length).toBeGreaterThanOrEqual(5);
  });
});

test('the data[0].rating exists', () => {
  expect.assertions(1);
  return db.findOne(place_id).then(data => {
    expect(!!data[0].rating).toBe(true);
  });
});

afterAll(() => {
  mongoose.disconnect();
});
