const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createUser = (req, res) => {
    models.users
      .create({ name: req.body.name })
      .then(user => res.status(201).json(user.serialize()))
      .catch(err => {
        if (err.message === "That username already exists") {
          return models.users
            .get({ name: req.body.name })
            .then(user => res.status(200).json(user.serialize()));
        }

        return res.status(400).send(err.message);
      });
  };

  const listUsers = (req, res) =>
    models.users
      .list()
      .then(users => users.map(user => user.serialize()))
      .then(users => res.status(200).json(users))
      .catch(err => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createUser);
  router.get("/", listUsers);

  return router;
};
