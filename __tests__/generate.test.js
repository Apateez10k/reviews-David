const fs = require('fs');
const path = require('path');
const generate = require('../db/seeding/generateCore.js');

const testFilePath = path.join(__dirname, 'test.json');

beforeAll(done => generate('../../__tests__/test.json', 10, done));

test('the file is created', (done) => {
  fs.readFile(testFilePath, (err) => {
    expect(err).toBeNull();
    done();
  });
});
test('there should be 10 objects in the array', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json.length).toBe(10);
    done();
  });
});
test('place_id should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].place_id).toBe(0);
    done();
  });
});
test('name should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].name).toBeDefined();
    done();
  });
});
test('price_level should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].price_level).toBeDefined();
    done();
  });
});
test('neighborhood should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].neighborhood).toBeDefined();
    done();
  });
});
test('city should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].city).toBeDefined();
    done();
  });
});
test('street should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].street).toBeDefined();
    done();
  });
});
test('rating should exist', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].rating).toBeDefined();
    done();
  });
});
test('reviews should have more than 0 items', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(json[0].reviews.length).toBeGreaterThan(0);
    done();
  });
});

afterAll(done => fs.unlink(testFilePath, done));
