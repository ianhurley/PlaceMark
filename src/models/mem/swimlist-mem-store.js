import { v4 } from "uuid";

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

  async getswimlistById(id) {
    return swimlists.find((swimlist) => swimlist._id === id);
  },

  async deleteSwimlistById(id) {
    const index = swimlists.findIndex((swimlist) => swimlist._id === id);
    swimlists.splice(index, 1);
  },

  async deleteAllSwimlists() {
    swimlists = [];
  },
};