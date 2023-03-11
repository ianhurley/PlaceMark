import { Swimlist } from "./swimlist.js";
import { spotMongoStore } from "./spot-mongo-store.js";

export const swimlistMongoStore = {
  async getAllSwimlists() {
    const swimlists = await Swimlist.find().lean();
    return swimlists;
  },

  async getSwimlistById(id) {
    if (id) {
      const swimlist = await Swimlist.findOne({ _id: id }).lean();
      if (swimlist) {
        swimlist.spots = await spotMongoStore.getSpotsBySwimlistId(swimlist._id);
      }
      return swimlist;
    }
    return null;
  },

  async addSwimlist(swimlist) {
    const newSwimlist = new Swimlist(swimlist);
    const swimlistObj = await newSwimlist.save();
    return this.getSwimlistById(swimlistObj._id);
  },

  async getUserSwimlists(id) {
    const swimlist = await Swimlist.find({ userid: id }).lean();
    return swimlist;
  },

  async deleteSwimlistById(id) {
    try {
      await Swimlist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSwimlists() {
    await Swimlist.deleteMany({});
  },

  async updateSwimlist(updatedSwimlist) {
    const swimlist = await Swimlist.findOne({ _id: updatedSwimlist._id });
    swimlist.title = updatedSwimlist.title;
    swimlist.img = updatedSwimlist.img;
    await swimlist.save();
  },
};