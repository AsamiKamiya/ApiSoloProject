exports.seed = function(knex, Promise) {
  return knex("stores")
    .del()
    .then(() => {
      return knex("stores").insert([
        { name: "SEVEN ELEVEN" },
        { name: "LAWSON" },
        { name: "Family Mart" }
      ]);
    });
};
