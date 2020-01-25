exports.seed = function(knex, Promise) {
  return knex("odens")
    .del()
    .then(() => {
      return knex("stores").select();
    })
    .then(results => {
      return results.map(res => res.id);
    })
    .then(results => {
      return knex("odens").insert([
        { name: "Ajishimi Tamago", kcal: 81, price: 86, store_id: results[0] },
        {
          name: "Dashimaki Tamago",
          kcal: 83,
          price: 108,
          store_id: results[0]
        },
        { name: "Ajishimi Daikon", kcal: 9, price: 86, store_id: results[0] },
        { name: "Shirataki", kcal: 5, price: 86, store_id: results[0] },
        { name: "Ajishimi Konnyaku", kcal: 5, price: 86, store_id: results[0] },
        { name: "Tama Konnyaku", kcal: 14, price: 140, store_id: results[0] },
        {
          name: "Ajishimi Kinu Atsuage",
          kcal: 62,
          price: 86,
          store_id: results[0]
        },
        {
          name: "Ajishimi Tsumire",
          kcal: 49,
          price: 108,
          store_id: results[0]
        },
        { name: "Gobou Maki", kcal: 43, price: 108, store_id: results[0] },
        { name: "Tsukune", kcal: 74, price: 140, store_id: results[0] },
        {
          name: "Mochi Kinutyaku",
          kcal: 112,
          price: 140,
          store_id: results[0]
        },
        {
          name: "Tsuyushimi Daikon",
          kcal: 13,
          price: 85,
          store_id: results[1]
        },
        { name: "Shirataki", kcal: 105, price: 130, store_id: results[1] },
        { name: "Mochi Kintyaku", kcal: 9, price: 86, store_id: results[1] },
        { name: "Egg", kcal: 80, price: 90, store_id: results[1] },
        {
          name: "Tsuyushimi Ganmo",
          kcal: 77,
          price: 110,
          store_id: results[1]
        },
        { name: "Yaki Chikuwa", kcal: 38, price: 100, store_id: results[1] },
        { name: "Gobou Maki", kcal: 50, price: 100, store_id: results[1] },
        { name: "Konnyaku", kcal: 7, price: 80, store_id: results[1] },
        { name: "Kinu Atsuage", kcal: 67, price: 100, store_id: results[1] },
        { name: "Tsumire", kcal: 40, price: 110, store_id: results[1] },
        { name: "Tsukune", kcal: 71, price: 130, store_id: results[1] },
        { name: "Hanpen", kcal: 32, price: 100, store_id: results[1] },
        { name: "Hanpen", kcal: 0, price: 105, store_id: results[2] },
        { name: "Egg", kcal: 0, price: 90, store_id: results[2] },
        { name: "Yaki Chikuwa", kcal: 0, price: 100, store_id: results[2] },
        { name: "Shirataki", kcal: 0, price: 80, store_id: results[2] },
        { name: "Tsumire", kcal: 0, price: 100, store_id: results[2] },
        { name: "Atsuage", kcal: 0, price: 100, store_id: results[2] },
        { name: "Gobou Maki", kcal: 0, price: 118, store_id: results[2] },
        { name: "Atsugiri Daikon", kcal: 0, price: 85, store_id: results[2] },
        { name: "Konnyaku", kcal: 0, price: 80, store_id: results[2] },
        { name: "Ganmo", kcal: 0, price: 110, store_id: results[2] },
        { name: "Tsukune", kcal: 0, price: 130, store_id: results[2] },
        { name: "Mochi Kintyaku", kcal: 0, price: 130, store_id: results[2] }
      ]);
    });
};
