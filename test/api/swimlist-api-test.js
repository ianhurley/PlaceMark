import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, ulster, testSwimlists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Swimlist API tests", () => {

  let user = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllSwimlists();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    ulster.userid = user._id;
  });

  teardown(async () => {});

  test("create swimlist", async () => {
    const returnedSwimlist = await placemarkService.createSwimlist(ulster);
    assert.isNotNull(returnedSwimlist);
    assertSubset(ulster, returnedSwimlist);
  });

  test("delete a swimlist", async () => {
    const swimlist = await placemarkService.createSwimlist(ulster);
    const response = await placemarkService.deleteSwimlist(swimlist._id);
    assert.equal(response.status, 204);
    try {
      const returnedSwimlist = await placemarkService.getSwimlist(swimlist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Swimlist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple swimlists", async () => {
    for (let i = 0; i < testSwimlists.length; i += 1) {
      testSwimlists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createSwimlist(testSwimlists[i]);
    }
    let returnedLists = await placemarkService.getAllSwimlists();
    assert.equal(returnedLists.length, testSwimlists.length);
    await placemarkService.deleteAllSwimlists();
    returnedLists = await placemarkService.getAllSwimlists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant swimlist", async () => {
    try {
      const response = await placemarkService.deleteSwimlist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Swimlist with this id", "Incorrect Response Message");
    }
  });
});