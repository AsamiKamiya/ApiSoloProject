exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        { name: "testuser1" },
        { name: "testuser2" },
        { name: "testuser3" }
      ]);
    });
};
