const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('The Drivers Controller', () => {
  xit('handles a GET request to /api/drivers', (done) => {
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

  it('GET to /api/drivers finds drivers in max distance', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628],
      },
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.2534507, 25.791581],
      },
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].obj.email === 'miami@test.com');
          done();
        });
    });
  });
});
