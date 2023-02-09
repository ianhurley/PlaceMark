import { userMemStore } from "./mem/user-mem-store.js";
import { swimlistMemStore } from "./mem/swimlist-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";

export const db = {
  userStore: null,
  swimlistStore: null,
  spotStore: null,

  init() {
    this.userStore = userMemStore;
    this.swimlistStore = swimlistMemStore;
    this.spotStore = spotMemStore;
  },
};