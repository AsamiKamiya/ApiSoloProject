const Store = function(dbStore) {
  this.id = dbStore.id;
  this.name = dbStore.name;
};

Store.prototype.serialize = function() {
  return {
    id: this.id,
    name: this.name
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Store),
    list: require("./list")(knex, Store)
  };
};
