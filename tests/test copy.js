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

  describe("for create test.", () => {
    let params = { name: "" };
    describe("not allow pattern.", () => {
      before(() => {
        params = { name: " " };
      });

      it("name policy check.", () =>
        models.users
          .create(params)
          .catch((err) =>
            expect(err.message).to.equal(
              "name must be provided, and be at least two characters"
            )
          ));
    });
    describe("allow pattern.", () => {
      before(() => {
        params = { name: "testUser1" };
      });
      after(() => knex("users").del());

      it("create new user.", () =>
        models.users.create(params).then((user) => {
          expect(user).to.include({ name: params.name.toLowerCase() });
          expect(user.id).to.be.a("number");
        }));
      it("duplicate check.", () =>
        models.users
          .create(params)
          .catch((err) =>
            expect(err.message).to.equal("That name already exists")
          ));
    });
  });
  describe("for list test.", () => {
    const params = [{ name: "test1" }, { name: "test2" }];

    describe("not allow pattern.", () => {
      before(() => {
        return Promise.all(params.map((param) => models.users.create(param)));
      });
      after(() => knex("users").del());

      it("users check.", () =>
        models.users.list().then((results) => {
          expect(results[0].name).to.equal(params[0].name);
          expect(results[1].name).to.equal(params[1].name);
        }));
      it("type check.", () =>
        models.users.list().then((results) => {
          expect(results[0].serialize().id).to.be.a("number");
          expect(results[0].serialize().name).to.be.a("string");
        }));
    });
  });
});

///////////////
///////////////

describe("stores", () => {
  describe("for create test.", () => {
    let params = { name: "" };
    describe("not allow pattern.", () => {
      before(() => {
        params = { name: " " };
      });

      it("name policy check.", () =>
        models.stores
          .create(params)
          .catch((err) =>
            expect(err.message).to.equal(
              "name must be provided, and be at least two characters"
            )
          ));
    });
    describe("allow pattern.", () => {
      before(() => {
        params = { name: "testStore1" };
      });
      after(() => knex("stores").del());

      it("create new store.", () =>
        models.stores.create(params).then((store) => {
          expect(store).to.include({ name: params.name });
          expect(store.id).to.be.a("number");
        }));
      it("duplicate check.", () =>
        models.stores
          .create(params)
          .catch((err) =>
            expect(err.message).to.equal("That name already exists")
          ));
    });
  });
  describe("for list test.", () => {
    const params = [{ name: "testStore1" }, { name: "testStore2" }];

    describe("not allow pattern.", () => {
      before(() => {
        return Promise.all(params.map((param) => models.stores.create(param)));
      });
      after(() => knex("stores").del());

      it("stores check.", () =>
        models.stores.list().then((results) => {
          expect(results[0].name).to.equal(params[0].name);
          expect(results[1].name).to.equal(params[1].name);
        }));
      it("type check.", () =>
        models.stores.list().then((results) => {
          expect(results[0].serialize().id).to.be.a("number");
          expect(results[0].serialize().name).to.be.a("string");
        }));
    });
  });
});
///////////////
///////////////

describe("odens", () => {
  describe("for create test.", () => {
    const storeId = [];
    let params = { name: "", kcal: 0, price: 0, storeId: "" };
    const storeParams = [{ name: "testStore1" }, { name: "testStore2" }];
    describe("not allow pattern.", () => {
      before(() => {
        return Promise.all(
          storeParams.map((param) => models.stores.create(param))
        ).then(() => {
          models.stores
            .list()
            .then((results) => {
              storeId.push(results[0].id);
              storeId.push(results[1].id);
            })
            .then(() => {
              params = { name: " ", kcal: 0, price: 0, storeId: storeId[0] };
            });
        });
      });
      after(() => knex("odens").del());
      it("name policy check.", () =>
        models.odens
          .create(params)
          .catch((err) =>
            expect(err.message).to.equal("OdenName must be provided.")
          ));
    });
    describe("allow pattern.", () => {
      before(() => {
        params = { name: "egg", kcal: 80, price: 100, storeId: storeId[0] };
      });
      after(() => {
        knex("odens").del();
      });

      it("create new oden.", () =>
        models.odens.create(params).then((oden) => {
          expect(oden).to.include({ name: params.name });
          expect(oden.id).to.be.a("number");
        }));
    });
  });
  describe("for list test.", () => {
    const storeId = [];
    let params = [];

    describe("not allow pattern.", () => {
      before(() => {
        models.stores
          .list()
          .then((results) => {
            storeId.push(results[0].id);
            storeId.push(results[1].id);
          })
          .then(() => {
            params = [
              { name: "specialEgg", kcal: 80, price: 100, storeId: storeId[0] },
              { name: "daikon", kcal: 10, price: 70, storeId: storeId[1] },
              { name: "ganmo", kcal: 80, price: 100, storeId: storeId[1] },
            ];
          })
          .then(() => {
            return Promise.all(
              params.map((param) => models.odens.create(param))
            );
          });
      });

      // after(() => knex("odens").del());

      it("odens check.", () =>
        models.odens.list().then((results) => {
          expect(results[0].name).to.equal("egg");
        }));
      it("type check.", () =>
        models.odens.list().then((results) => {
          expect(results[0].serialize().id).to.be.a("number");
          expect(results[0].serialize().name).to.be.a("string");
        }));
    });
  });
});

///////////////
///////////////

describe("purchases", () => {
  const userId = [];
  const odenId = [];
  const id = [];
  before(() => {
    models.users
      .list()
      .then((results) => {
        userId.push(results[0].id);
        userId.push(results[1].id);
      })
      .then(() => {
        models.odens.list().then((results) => {
          odenId.push(results[0].id);
          odenId.push(results[1].id);
        });
      });
  });
  it("for create test.", () => {
    models.purchases
      .create({ user_id: userId[0], oden_id: odenId[0], count: "1" })
      .then((result) => expect(result.user_id).to.equal(userId[0]));
  });
  it("for list test.", () => {
    models.purchases.list().then((result) => {
      expect(result.user_id).to.equal(userId[0]);
      id.push(result.id);
    });
  });
});
