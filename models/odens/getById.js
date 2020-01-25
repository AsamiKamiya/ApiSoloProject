module.exports = (knex, Oden) => {
  return params => {
    const id = params.id;
    console.log(id);

    return knex("odens as A")
      .select("A.name", "A.price", "A.kcal", "B.name as store_name")
      .join("stores as B", "A.store_id", "=", "B.id")
      .where({ "A.id": id })
      .then(odens => {
        if (odens.length) {
          return odens.map(oden => new Oden(oden));
        }
        throw new Error(`Error finding user ${id}`);
      });
  };
};
