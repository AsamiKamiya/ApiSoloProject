module.exports = (knex, Purchase) => {
  return (params) => {
    const user_id = params.user_id;
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
      .join("odens as C", "A.oden_id", "=", "C.id")
      .where({ user_id })
      .then((record) => {
        if (record.length) {
          return record.map((reco) => new Purchase(reco));
        }
        throw new Error(`Error finding record`);
      });
  };
};
