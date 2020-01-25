const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createStore = (req, res) => {
    models.stores
      .create({ name: req.body.name })
      .then(user => res.status(201).json(user.serialize()))
      .catch(err => {
        if (err.message === "That name already exists") {
          return models.users
            .get({ name: req.body.name })
            .then(user => res.status(200).json(user.serialize()));
        }

        return res.status(400).send(err.message);
      });
  };

  const listStores = (req, res) =>
    models.stores
      .list()
      .then(users => users.map(user => user.serialize()))
      .then(users => res.status(200).json(users))
      .catch(err => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createStore);
  router.get("/", listStores);

  return router;
};
