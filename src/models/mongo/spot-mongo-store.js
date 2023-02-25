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
    spot.name = updatedSpot.name;
    spot.county = updatedSpot.county;
    spot.latitude = updatedSpot.latitude;
    spot.longitude = updatedSpot.longitude;
    spot.categorey = updatedSpot.categorey;
    await spot.save();
  },
};