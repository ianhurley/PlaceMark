import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../src/models/db.js";
import { testSwimlists, leinster } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

EventEmitter.setMaxListeners(25);


suite("Swimlist Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.swimlistStore.deleteAllSwimlists();
    for (let i = 0; i < testSwimlists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSwimlists[i] = await db.swimlistStore.addSwimlist(testSwimlists[i]);
    }
  });

  test("create a swimlist", async () => {
    const swimlist = await db.swimlistStore.addSwimlist(leinster);
    assertSubset(leinster, swimlist);
    assert.isDefined(swimlist._id);
  });

  test("delete all swimlists", async () => {
    let returnedSwimlists = await db.swimlistStore.getAllSwimlists();
    assert.equal(returnedSwimlists.length, 3);
    await db.swimlistStore.deleteAllSwimlists();
    returnedSwimlists = await db.swimlistStore.getAllSwimlists();
    assert.equal(returnedSwimlists.length, 0);
  });

  test("get a swimlist - success", async () => {
    const swimlist = await db.swimlistStore.addSwimlist(leinster);
    const returnedSwimlist = await db.swimlistStore.getSwimlistById(swimlist._id);
    assertSubset(leinster, swimlist);
  });

  test("delete One swimlist - success", async () => {
    const id = testSwimlists[0]._id;
    await db.swimlistStore.deleteSwimlistById(id);
    const returnedSwimlists = await db.swimlistStore.getAllSwimlists();
    assert.equal(returnedSwimlists.length, testSwimlists.length - 1);
    const deletedSwimlist = await db.swimlistStore.getSwimlistById(id);
    assert.isNull(deletedSwimlist);
  });

  test("get a swimlist - bad params", async () => {
    assert.isNull(await db.swimlistStore.getSwimlistById(""));
    assert.isNull(await db.swimlistStore.getSwimlistById());
  });

  test("delete One swimlist - fail", async () => {
    await db.swimlistStore.deleteSwimlistById("bad-id");
    const allSwimlists = await db.swimlistStore.getAllSwimlists();
    assert.equal(testSwimlists.length, allSwimlists.length);
  });
});