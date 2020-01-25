const express = require("express");

module.exports = models => {
  const createPurchases = (req, res) => {
    models.purchases
      .create({
        user_id: req.params.id,
        oden_id: req.params.odenId,
        count: req.body.count
      })
      .then(reco => res.status(201).json(reco.serialize()))
      .catch(err => res.status(400).send(err.message));
  };

  const listPurchases = (req, res) =>
    models.purchases
      .list()
      .then(purchases => purchases.map(record => record.serialize()))
      .then(purchases => res.status(200).json(purchases))
      .catch(err => res.status(400).send(err.message));

  const getByUser = (req, res) =>
    models.purchases
      .getByUser({ user_id: req.params.id })
      .then(messages => messages.map(msg => msg.serialize()))
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(400).send(err.message));

  const modify = (req, res) =>
    models.purchases
      .modify({
        id: req.params.id,
        user_id: req.body.user_id,
        oden_id: req.body.oden_id,
        count: req.body.count
      })
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(400).send(err.message));

  const deletePurchase = (req, res) =>
    models.purchases
      .delete({
        id: req.params.id
      })
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(400).send(err.message));
  /**
   * Routes
   */
  const router = express.Router();
  router.post("/user/:id/odens/:odenId", createPurchases);
  router.get("", listPurchases);
  router.get("/user/:id", getByUser);
  router.patch("/:id/", modify);
  router.delete("/:id", deletePurchase);
  // router.get("/:id", getOdensById);
  // router.get("/store/:id", getOdensByStore);

  return router;
};
