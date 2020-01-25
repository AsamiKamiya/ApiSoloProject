const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createOden = (req, res) => {
    models.odens
      .create({
        name: req.body.name,
        kcal: req.body.kcal,
        price: req.body.price,
        storeId: req.params.id
      })
      .then(odens => res.status(201).json(odens.serialize()))
      .catch(err => res.status(400).send(err.message));
  };

  const listOdens = (req, res) =>
    models.odens
      .list()
      .then(odens => odens.map(oden => oden.serialize()))
      .then(odens => res.status(200).json(odens))
      .catch(err => res.status(400).send(err.message));

  const getOdensByStore = (req, res) =>
    models.odens
      .getByStore({ storeId: req.params.id })
      .then(messages => messages.map(msg => msg.serialize()))
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(400).send(err.message));

  const getOdensById = (req, res) =>
    models.odens
      .getById({ id: req.params.id })
      .then(messages => messages.map(msg => msg.serialize()))
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("/:id", createOden);
  router.get("", listOdens);
  router.get("/:id", getOdensById);
  router.get("/store/:id", getOdensByStore);

  return router;
};
