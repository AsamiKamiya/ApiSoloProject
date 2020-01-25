module.exports = (knex, Purchase) => {
  return params => {
    const { id, user_id, oden_id, count } = params;
    return knex("purchases")
      .where({ id })
      .update({ user_id, oden_id, count })
      .then(() => {
        return knex("purchases as A")
          .select(
            "B.name as username",
            "C.name as odenname",
            "C.id as store",
            "count",
            "purchase_date"
          )
          .where({ "A.id": id })
          .join("users as B", "A.user_id", "=", "B.id")
          .join("odens as C", "A.oden_id", "=", "C.id");
      })
      .then(reco => new Purchase(reco.pop()))
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
