// import { userMemStore } from "./mem/user-mem-store.js";
// import { swimlistMemStore } from "./mem/swimlist-mem-store.js";
// import { spotMemStore } from "./mem/spot-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { swimlistJsonStore } from "./json/swimlist-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";

export const db = {
  userStore: null,
  swimlistStore: null,
  spotStore: null,

  init() {
    this.userStore = userJsonStore;
    this.swimlistStore = swimlistJsonStore;
    this.spotStore = spotJsonStore;
  },
};