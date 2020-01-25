// Create odens_table.

exports.up = function(knex, Promise) {
  return knex.schema.createTable("odens", t => {
    t.increments().index();

    // oden name
    t.string("name", 50)
      .notNullable()
      .index();

    // oden price
    t.integer("price").notNullable();

    // kcal
    t.integer("kcal").notNullable();

    // store_id
    t.integer("store_id")
      .notNullable()
      .references("stores.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("odens");
};
