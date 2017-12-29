const Driver = require('../models/driver');

module.exports = {
  index(req, res, next) {
    res.send({ hi: 'there' });
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
