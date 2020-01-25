// Create purchases_table.

exports.up = function(knex, Promise) {
  return knex.schema.createTable("purchases", t => {
    t.increments().index();

    // user_id
    t.integer("user_id")
      .notNullable()
      .index()
      .references("users.id");

    // oden_id
    t.integer("oden_id")
      .notNullable()
      .index()
      .references("odens.id");

    // count
    t.integer("count").notNullable();

    // purechase_date
    t.timestamp("purchase_date")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("purchases");
};
