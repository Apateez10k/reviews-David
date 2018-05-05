const db = require('../db/models/storePostgres.js');

const id = 2;

test('the data has a place_id', () => {
  expect.assertions(1);
  return db.findOne(id).then((data) => {
    expect(data.place_id !== undefined).toBe(true);
  });
});

test('the data.reviews is an array', () => {
  expect.assertions(1);
  return db.findOne(id).then((data) => {
    expect(Array.isArray(data.reviews)).toBe(true);
  });
});

test('the data.reviews has at least 1 reviews', () => {
  expect.assertions(1);
  return db.findOne(id).then((data) => {
    expect(data.reviews.length).toBeGreaterThanOrEqual(1);
  });
});

test('the data.rating exists', () => {
  expect.assertions(1);
  return db.findOne(id).then((data) => {
    expect(!!data.rating).toBe(true);
  });
});

afterAll(() => {
  db.client.end();
});
