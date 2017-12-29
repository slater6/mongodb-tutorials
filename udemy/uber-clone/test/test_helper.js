const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://mongo.dev:27017/uber_test', {
    useMongoClient: true,
  });
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.warn('Error', error);
    });
});

after(() => {
  mongoose.disconnect();
});

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop(() => {
    done();
  });
});
