import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, ulster, testSwimlists, testSpots, testspot } from "../fixtures.js";

suite("Spot API tests", () => {
  let user = null;
  let test1 = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllSwimlists();
    await placemarkService.deleteAllSpots();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    ulster.userid = user._id;
    test1 = await placemarkService.createSwimlist(ulster);
  });

  teardown(async () => {});

  test("create spot", async () => {
    const returnedSpot = await placemarkService.createSpot(test1._id, testspot);
    assertSubset(testspot, returnedSpot);
  });

  test("create Multiple spots", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createSpot(test1._id, testSpots[i]);
    }
    const returnedSpots = await placemarkService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await placemarkService.getSpot(returnedSpots[i]._id);
      assertSubset(spot, returnedSpots[i]);
    }
  });

  test("Delete SpotApi", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createSpot(test1._id, testSpots[i]);
    }
    let returnedSpots = await placemarkService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await placemarkService.deleteSpot(returnedSpots[i]._id);
    }
    returnedSpots = await placemarkService.getAllSpots();
    assert.equal(returnedSpots.length, 0);
  });

  test("denormalised swimlist", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createSpot(test1._id, testSpots[i]);
    }
    const returnedSwimlist = await placemarkService.getSwimlist(test1._id);
    assert.equal(returnedSwimlist.spots.length, testSpots.length);
    for (let i = 0; i < testSpots.length; i += 1) {
      assertSubset(testSpots[i], returnedSwimlist.spots[i]);
    }
  });
});