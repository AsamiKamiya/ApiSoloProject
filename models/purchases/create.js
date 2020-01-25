module.exports = (knex, Purchase) => {
  return (params) => {
    const { user_id, oden_id, count } = params;
    return knex("purchases")
      .insert({ user_id, oden_id, count })
      .then(() => {
        return knex("purchases as A")
          .select(
            "A.id as id",
            "B.name as username",
            "C.name as odenname",
            "C.id as store",
            "count",
            "purchase_date"
          )
          .join("users as B", "A.user_id", "=", "B.id")
          .join("odens as C", "A.oden_id", "=", "C.id");
      })
      .then((reco) => new Purchase(reco.pop()))
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
