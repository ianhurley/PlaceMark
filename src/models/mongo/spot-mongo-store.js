import { Spot } from "./spot.js";

export const spotMongoStore = {
  async getAllSpots() {
    const spots = await Spot.find().lean();
    return spots;
  },

  async addSpot(swimlistId, spot) {
    spot.swimlistid = swimlistId;
    const newSpot = new Spot(spot);
    const spotObj = await newSpot.save();
    return this.getSpotById(spotObj._id);
  },

  async getSpotsBySwimlistId(id) {
    const spots = await Spot.find({ swimlistid: id }).lean();
    return spots;
  },

  async getSpotById(id) {
    if (id) {
      const spot = await Spot.findOne({ _id: id }).lean();
      return spot;
    }
    return null;
  },

  async deleteSpot(id) {
    try {
      await Spot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSpots() {
    await Spot.deleteMany({});
  },

  async updateSpot(spot, updatedSpot) {
    const spotDoc = await Spot.findOne({ _id: spot._id });
    spotDoc.name = updatedSpot.name;
    spotDoc.county = updatedSpot.county;
    spotDoc.latitude = updatedSpot.latitude;
    spotDoc.longitude = updatedSpot.longitude;
    spotDoc.categorey = updatedSpot.categorey;
    await spotDoc.save();
  },
};