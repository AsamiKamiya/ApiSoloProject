// Create stores_table.

exports.up = function(knex, Promise) {
  return knex.schema.createTable("stores", t => {
    t.increments().index();

    // store name
    t.string("name", 20)
      .unique()
      .notNullable()
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("stores");
};
