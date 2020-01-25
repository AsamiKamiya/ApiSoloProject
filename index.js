const express = require("express");
const config = require("./config");

const knex = require("knex")(config.db);
const models = require("./models")(knex);
const apiRouter = require("./controllers")(models);

const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api", apiRouter);
app.use(express.static(`${__dirname}/public`));

app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }

  return res.status(500).send("Internal Error.");
});

app.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
