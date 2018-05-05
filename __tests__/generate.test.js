const fs = require('fs');
const path = require('path');
const generate = require('../db/seeding/generateCore.js');

const testFilePath = path.join(__dirname, 'test.json');

beforeAll(done => generate('../../__tests__/test.json', 10, done));

test('the file is created', (done) => {
  fs.readFile(testFilePath, (err, data) => {
    const json = JSON.parse(data);
    expect(err).toBeNull();
    expect(json.length).toBe(10);
    expect(json[0].place_id).toBe(0);
    expect(json[0].name).toBeDefined();
    expect(json[0].price_level).toBeDefined();
    expect(json[0].neighborhood).toBeDefined();
    expect(json[0].city).toBeDefined();
    expect(json[0].street).toBeDefined();
    expect(json[0].rating).toBeDefined();
    expect(json[0].reviews.length).toBeGreaterThan(0);
    done();
  });
});

afterAll(done => fs.unlink(testFilePath, done));
