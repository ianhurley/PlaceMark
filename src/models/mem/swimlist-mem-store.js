import { v4 } from "uuid";
import { spotMemStore } from "./spot-mem-store.js";

let swimlists = [];

export const swimlistMemStore = {
  async getAllSwimlists() {
    return swimlists;
  },

  async addSwimlist(swimlist) {
    swimlist._id = v4();
    swimlists.push(swimlist);
    return swimlist;
  },

  async getSwimlistById(id) {
    const list = swimlists.find((swimlist) => swimlist._id === id);
    list.spots = await spotMemStore.getSpotsBySwimlistId(list._id);
    return list;
  },

  async deleteSwimlistById(id) {
    const index = swimlists.findIndex((swimlist) => swimlist._id === id);
    swimlists.splice(index, 1);
  },

  async deleteAllSwimlists() {
    swimlists = [];
  },

  async getUserSwimlists(userid) {
    return swimlists.filter((swimlist) => swimlist.userid === userid);
  },
};