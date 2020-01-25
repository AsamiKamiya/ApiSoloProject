const Oden = function(dbOden) {
  this.id = dbOden.id;
  this.name = dbOden.name;
  this.price = dbOden.price;
  this.kcal = dbOden.kcal;
  this.store_name = dbOden.store_name;
  this.store_id = dbOden.store_id;
};

Oden.prototype.serialize = function() {
  return {
    id: this.id,
    name: this.name,
    price: this.price,
    kcal: this.kcal,
    store_name: this.store_name,
    store_id: this.store_id
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Oden),
    list: require("./list")(knex, Oden),
    getByStore: require("./getByStore")(knex, Oden),
    getById: require("./getById")(knex, Oden)
  };
};
