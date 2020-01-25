const validateUsername = (name) =>
  typeof name === "string" && name.replace(" ", "").length > 2;

module.exports = (knex, User) => {
  return (params) => {
    const name = params.name;

    if (!validateUsername(name)) {
      return Promise.reject(
        new Error("name must be provided, and be at least two characters")
      );
    }

    return knex("stores")
      .insert({ name })
      .then(() => {
        return knex("stores")
          .where({ name })
          .select();
      })
      .then((store) => new User(store.pop()))
      .catch((err) => {
        if (
          err.message.match("duplicate key value") ||
          err.message.match("unique constraint failed")
        )
          return Promise.reject(new Error("That name already exists"));

        return Promise.reject(err);
      });
  };
};
