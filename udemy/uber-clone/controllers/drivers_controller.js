const Driver = require('../models/driver');

module.exports = {
  index(req, res, next) {
    const { lng, lat } = req.query;
    Driver.geoNear(
      {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      {
        spherical: true,
        maxDistance: 200000,
      },
    )
      .then((drivers) => {
        res.send(drivers);
      })
      .catch(next);
  },
  create(req, res, next) {
    const driver = new Driver(req.body);
    driver
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch(next);
  },
  edit(req, res, next) {
    Driver.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Driver.findById({ _id: req.params.id }))
      .then(driver => res.send(driver))
      .catch(next);
  },
  delete(req, res, next) {
    Driver.findByIdAndRemove(req.params.id)
      .then(driver => res.status(204).send(driver))
      .catch(next);
  },
};
