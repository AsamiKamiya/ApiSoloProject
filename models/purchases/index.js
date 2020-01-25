const Purchase = function(dbPurchase) {
  this.id = dbPurchase.id;
  this.username = dbPurchase.username;
  this.odenname = dbPurchase.odenname;
  this.count = dbPurchase.count;
  this.purchaseDate = new Date(dbPurchase.purchase_date);
  this.store = dbPurchase.store_id;
};

Purchase.prototype.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    odenname: this.odenname,
    storeId: this.store,
    count: this.count,
    purchaseDate: this.purchaseDate
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Purchase),
    list: require("./list")(knex, Purchase),
    getByUser: require("./getByUser")(knex, Purchase),
    modify: require("./modify")(knex, Purchase),
    delete: require("./delete")(knex, Purchase)
    // get: require("./get")(knex, User),
  };
};
