module.exports = (knex, Oden) => {
  return () => {
    return knex("odens as A")
      .select("A.id", "A.name", "A.price", "A.kcal", "B.name as store_name")
      .join("stores as B", "A.store_id", "=", "B.id")
      .then((odens) => {
        if (odens.length) {
          return odens.map((oden) => new Oden(oden));
        }
        throw new Error(`Error finding oden`);
      });
  };
};
