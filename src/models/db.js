import { userMemStore } from "./mem/user-mem-store.js";
import { swimlistMemStore } from "./mem/swimlist-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { swimlistJsonStore } from "./json/swimlist-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { swimlistMongoStore } from "./mongo/swimlist-mongo-store.js";
import { spotMongoStore } from "./mongo/spot-mongo-store.js";

export const db = {
  userStore: null,
  swimlistStore: null,
  spotStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.swimlistStore = swimlistJsonStore;
        this.spotStore = spotJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.swimlistStore = swimlistMongoStore;
        this.spotStore = spotMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.swimlistStore = swimlistMemStore;
        this.spotStore = spotMemStore; 
    }
  },
};