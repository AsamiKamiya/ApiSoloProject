const User = function(dbUser) {
  this.id = dbUser.id;
  this.name = dbUser.name;
};

User.prototype.serialize = function() {
  return {
    id: this.id,
    name: this.name
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, User),
    list: require("./list")(knex, User)
  };
};
