module.exports = function(knex) {
  return {
    users: require("./users")(knex),
    odens: require("./odens")(knex),
    stores: require("./stores")(knex),
    purchases: require("./purchases")(knex)
  };
};
