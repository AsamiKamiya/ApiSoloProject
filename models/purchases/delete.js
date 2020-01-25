module.exports = (knex, Purchase) => {
  return (params) => {
    const { id } = params;
    return knex("purchases")
      .where({ id })
      .del()
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
      .then((record) => {
        if (record.length) {
          return record.map((reco) => new Purchase(reco));
        }
        throw new Error(`Error finding record`);
      });
  };
};
