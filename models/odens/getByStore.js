module.exports = (knex, Oden) => {
  return params => {
    const store_id = params.storeId;
    return knex("odens as A")
      .select("A.name", "A.price", "A.kcal", "B.name as store_name")
      .join("stores as B", "A.store_id", "=", "B.id")
      .where({ store_id })
      .then(odens => {
        if (odens.length) {
          return odens.map(oden => new Oden(oden));
        }
        throw new Error(`Error finding user ${store_id}`);
      });
  };
};
