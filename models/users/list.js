module.exports = (knex, User) => {
  return () => {
    return knex("users")
      .select()
      .then((users) => {
        if (users.length) {
          return users.map((usr) => new User(usr));
        }
        throw new Error(`Error finding user`);
      });
  };
};
