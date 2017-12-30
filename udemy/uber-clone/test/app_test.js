const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  xit('handles a GET request to /api', (done) => {
    request(app)
      .get('/api/drivers')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });
});
