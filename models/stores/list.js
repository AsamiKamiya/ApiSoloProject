module.exports = (knex, Store) => {
  return () => {
    return knex("stores")
      .select()
      .then(stores => {
        if (stores.length) {
          return stores.map(store => new Store(store));
        }
        throw new Error(`Error finding store`);
      });
  };
};
