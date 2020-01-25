const express = require("express");

const router = express.Router();

const userRouter = require("./users");
const odenRouter = require("./odens");
const storeRouter = require("./stores");
const purchaseRouter = require("./purchases");

module.exports = models => {
  router.use("/users", userRouter(models));
  router.use("/odens", odenRouter(models));
  router.use("/stores", storeRouter(models));
  router.use("/purchases", purchaseRouter(models));
  return router;
};
