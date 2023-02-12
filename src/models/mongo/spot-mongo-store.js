import { Spot } from "./spot.js";

export const spotMongoStore = {
  async getSpotsBySwimlistId(id) {
    const spots = await Spot.find({ swimlistid: id }).lean();
    return spots;
  },
};