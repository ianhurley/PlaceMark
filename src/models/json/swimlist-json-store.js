import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { spotJsonStore } from "./spot-json-store.js";

const db = new Low(new JSONFile("./src/models/json/swimlists.json"));
db.data = { swimlists: [] };

export const swimlistJsonStore = {
  async getAllSwimlists() {
    await db.read();
    return db.data.swimlists;
  },

  async addSwimlist(swimlist) {
    await db.read();
    swimlist._id = v4();
    db.data.swimlists.push(swimlist);
    await db.write();
    return swimlist;
  },

  async getSwimlistById(id) {
    await db.read();
    let list = db.data.swimlists.find((swimlist) => swimlist._id === id);
    if (list) {
      list.spots = await spotJsonStore.getSpotsBySwimlistId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserSwimlists(userid) {
    await db.read();
    return db.data.swimlists.filter((swimlist) => swimlist.userid === userid);
  },

  async deleteSwimlistById(id) {
    await db.read();
    const index = db.data.swimlists.findIndex((swimlist) => swimlist._id === id);
    if (index !== -1) db.data.swimlists.splice(index, 1);
    await db.write();
  },

  async deleteAllSwimlists() {
    db.data.swimlists = [];
    await db.write();
  },
};