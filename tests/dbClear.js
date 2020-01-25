const config = require("../config");
const knex = require("knex")(config.db);

const ignoreError = () => {};

const clearTable = (tableName) =>
  knex(tableName)
    .del()
    .catch(ignoreError);

const tables = ["purchases", "users", "stores", "odens"];
Promise.all(tables.map(clearTable)).then(process.exit);
