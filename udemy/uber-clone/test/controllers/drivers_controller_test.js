const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('The Drivers Controller', () => {
  it('handles a GET request to /api/drivers', (done) => {
    request(app)
      .get('/api/drivers')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });

  it('Post to /api/drivers creates new driver', (done) => {
    Driver.count().then((count) => {
      request(app)
        .post('/api/drivers')
        .send({
          email: 'test@test.com',
        })
        .end((err, response) => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers edits existing driver', (done) => {
    request(app)
      .post('/api/drivers')
      .send({
        email: 'test@test.com',
      })
      .end((err, response) => {
        request(app)
          .put(`/api/drivers/${response.body._id}`)
          .send({
            driving: true,
          })
          .end(() => {
            Driver.findById({ _id: response.body._id }).then((driver) => {
              assert(driver.driving === true);
              done();
            });
          });
      });
  });

  it('DELETE to /api/drivers removes existing driver', (done) => {
    request(app)
      .post('/api/drivers')
      .send({
        email: 'test@test.com',
      })
      .end((err, response) => {
        request(app)
          .delete(`/api/drivers/${response.body._id}`)
          .end(() => {
            Driver.findById(response.body._id).then((driver) => {
              assert(driver === null);
              done();
            });
          });
      });
  });
});
