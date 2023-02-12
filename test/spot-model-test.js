import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testSwimlists, testSpots, leinster, ulster, testspot, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Spot Model tests", () => {

  let leinsterList = null;

  setup(async () => {
    db.init("mongo");
    await db.swimlistStore.deleteAllSwimlists();
    await db.spotStore.deleteAllSpots();
    leinsterList = await db.swimlistStore.addSwimlist(leinster);
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSpots[i] = await db.spotStore.addSpot(leinsterList._id, testSpots[i]);
    }
  });

  test("create single spot", async () => {
    const ulsterList = await db.swimlistStore.addSwimlist(ulster);
    const spot = await db.spotStore.addSpot(ulsterList._id, testspot)
    assert.isNotNull(spot._id);
    assertSubset (testspot, spot);
  });

  test("get multiple spots", async () => {
    const spots = await db.spotStore.getSpotsBySwimlistId(leinsterList._id);
    assert.equal(spots.length, testSpots.length)
  });

  test("delete all spots", async () => {
    const spots = await db.spotStore.getAllSpots();
    assert.equal(testSpots.length, spots.length);
    await db.spotStore.deleteAllSpots();
    const newSpots = await db.spotStore.getAllSpots();
    assert.equal(0, newSpots.length);
  });

  test("get a spot - success", async () => {
    const ulsterList = await db.swimlistStore.addSwimlist(ulster);
    const spot = await db.spotStore.addSpot(ulsterList._id, testspot)
    const newSpot = await db.spotStore.getSpotById(spot._id);
    assertSubset (testspot, newSpot);
  });

  test("delete One Spot - success", async () => {
    await db.spotStore.deleteSpot(testSpots[0]._id);
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testSwimlists.length - 1);
    const deletedSpot = await db.spotStore.getSpotById(testSpots[0]._id);
    assert.isNull(deletedSpot);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.spotStore.getSpotById(""));
    assert.isNull(await db.spotStore.getSpotById());
  });

  test("delete one spot - fail", async () => {
    await db.spotStore.deleteSpot("bad-id");
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testSwimlists.length);
  });
});