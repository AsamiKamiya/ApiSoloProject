// Create users_table.

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments().index();

    // user name
    t.string("name", 20)
      .unique()
      .notNullable()
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
