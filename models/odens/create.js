const validateOdenname = name =>
  typeof name === "string" && name.replace(" ", "").length > 0;

module.exports = (knex, Odens) => {
  return params => {
    const { name, kcal, price, storeId } = params;

    if (!validateOdenname(name)) {
      return Promise.reject(new Error("OdenName must be provided."));
    }

    return knex("odens")
      .insert({ name, kcal, price, store_id: storeId })
      .then(() => {
        return knex("odens")
          .where({ name, store_id: storeId })
          .select();
      })
      .then(oden => new Odens(oden.pop()))
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
