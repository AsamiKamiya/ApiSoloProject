const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

describe("db check", () => {
  describe("setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () =>
      knex("users")
        .select()
        .catch(() => assert.fail("users table is not found.")));
  });
});

describe("users create test", () => {
  let params = { name: " " };
  it("name policy check.", () =>
    models.users
      .create(params)
      .catch((err) =>
        expect(err.message).to.equal(
          "name must be provided, and be at least two characters"
        )
      ));
  it("should add 1 user.", () => {
    params = { name: "testUser1" };
    models.users.create(params).then((user) => {
      expect(user).to.include({ name: params.name.toLowerCase() });
      expect(user.id).to.be.a("number");
    });
  });
  it("duplicate check.", () =>
    models.users
      .create(params)
      .catch((err) =>
        expect(err.message).to.equal("That name already exists")
      ));
});

describe("users list test", () => {
  const params = { name: "testUser2" };
  before(() => {
    return models.users.create(params);
  });

  it("users check.", () =>
    models.users.list().then((results) => {
      expect(results[0].name).to.equal("testUser1".toLocaleLowerCase());
      expect(results[1].name).to.equal("testUser2".toLocaleLowerCase());
    }));
  it("type check.", () =>
    models.users.list().then((results) => {
      expect(results[0].serialize().id).to.be.a("number");
      expect(results[0].serialize().name).to.be.a("string");
    }));
});

describe("stores create test", () => {
  let params = { name: " " };
  it("name policy check.", () =>
    models.stores
      .create(params)
      .catch((err) =>
        expect(err.message).to.equal(
          "name must be provided, and be at least two characters"
        )
      ));
  it("should add 1 store.", () => {
    params = { name: "testStore1" };
    models.stores.create(params).then((store) => {
      expect(store).to.include({ name: params.name });
      expect(store.id).to.be.a("number");
    });
  });
  it("duplicate check.", () =>
    models.stores
      .create(params)
      .catch((err) =>
        expect(err.message).to.equal("That name already exists")
      ));
});

describe("stores list test", () => {
  const params = { name: "testStore2" };
  before(() => {
    return models.stores.create(params);
  });

  it("stores check.", () =>
    models.stores.list().then((results) => {
      expect(results[0].name).to.equal("testStore1");
      expect(results[1].name).to.equal("testStore2");
    }));
  it("type check.", () =>
    models.stores.list().then((results) => {
      expect(results[0].serialize().id).to.be.a("number");
      expect(results[0].serialize().name).to.be.a("string");
    }));
});

describe("odens create test", () => {
  let params;
  before(() => {
    return models.stores
      .list()
      .then((results) => {
        return results[0].id;
      })
      .then((storeId) => {
        params = { name: " ", kcal: 0, price: 0, storeId };
      });
  });

  it("name policy check.", () =>
    models.odens
      .create(params)
      .catch((err) =>
        expect(err.message).to.equal("OdenName must be provided.")
      ));
  it("should add 1 oden.", () => {
    params.name = "delicious";
    params.kcal = 100;
    params.price = 105;
    models.odens.create(params).then((oden) => {
      expect(oden).to.include({ name: params.name });
      expect(oden.id).to.be.a("number");
    });
  });
});
describe("odens list test", () => {
  let params;
  before(() => {
    return models.stores
      .list()
      .then((results) => {
        return results[1].id;
      })
      .then((storeId) => {
        params = { name: "GoodOden", kcal: 20, price: 30, storeId };
      })
      .then(() => {
        models.odens.create(params);
      });
  });

  it("oden check.", () => {
    models.odens.list().then((results) => {
      expect(results.length).to.equal(2);
      expect(results[0].name).to.equal("delicious");
    });
  });
  it("type check.", () => {
    models.odens.list().then((results) => {
      expect(results[0].serialize().id).to.be.a("number");
      expect(results[0].serialize().name).to.be.a("string");
      expect(results[0].serialize().price).to.be.a("number");
      expect(results[0].serialize().kcal).to.be.a("number");
    });
  });
  it("by store check.", () => {
    models.odens.getByStore(params).then((results) => {
      expect(results.length).to.equal(1);
      expect(results[0].name).to.equal("GoodOden");
    });
  });
});
describe("purchase create test", () => {
  let params;
  before(() => {
    return models.odens.list().then((results) => {
      params = { user_id: "", oden_id: results[0].id, count: 1 };
    });
  });
  beforeEach(() => {
    return models.users.list().then((results) => {
      params.user_id = results[0].id;
    });
  });

  it("should add 1 purchase.", () => {
    models.purchases.create(params).then((reco) => {
      expect(reco.count).to.equal(1);
      expect(reco.id).to.be.a("number");
    });
  });
});

describe("purchase list test", () => {
  let params;
  before(() => {
    return models.odens.list().then((results) => {
      params = { user_id: "", oden_id: results[1].id, count: 2 };
    });
  });
  beforeEach(() => {
    return models.users.list().then((results) => {
      params.user_id = results[1].id;
    });
  });

  it("purchase check.", () => {
    return models.purchases.create(params).then(() => {
      models.purchases.list().then((results) => {
        expect(results.length).to.equal(2);
      });
    });
  });
  it("purchase By user check.", () => {
    models.purchases.getByUser(params).then((results) => {
      expect(results.length).to.equal(1);
    });
  });
});

describe("purchase modify/delete test", () => {
  let params;
  before(() => {
    return models.purchases.list().then((results) => {
      params = results.pop();
    });
  });

  it("modify check.", () => {
    params.count = 10;
    return models.purchases.modify(params).then((results) => {
      expect(results.count).to.equal(10);
    });
  });
  it("delete check.", () => {
    return models.purchases.delete(params).then(() => {
      models.purchases.list().then((results) => {
        expect(results.length).to.equal(1);
      });
    });
  });
});
