const mongoose = require('mongoose');

const dbconnection = require('./dbconnection');

beforeAll(() => {
  dbconnection();
});

test('Should fail when env not test ', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

test('Test if database connection exists', () => {
  expect(mongoose.connection.name).toBe('cwdb_test');
});

afterAll((done) => {
  mongoose.disconnect(done);
});
