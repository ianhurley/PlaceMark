import { v4 } from "uuid";

let spots = [];

export const spotMemStore = {
  async getAllSpots() {
    return spots;
  },

  async addSpot(swimlistId, spot) {
    spot._id = v4();
    spot.swimlistid = swimlistId;
    spots.push(spot);
    return spot;
  },

  async getSpotsBySwimlistId(id) {
    return spots.filter((spot) => spot.swimlistid === id);
  },

  async getSpotById(id) {
    return spots.find((spot) => spot._id === id);
  },

  async getSwimlistSpots(swimlistId) {
    return spots.filter((spot) => spot.swimlistid === swimlistId);
  },

  async deleteSpot(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    spots.splice(index, 1);
  },

  async deleteAllSpots() {
    spots = [];
  },

  async updateSpot(spot, updatedSpot) {
    spot.spot = updatedSpot.spot;
    spot.region = updatedSpot.region;
    spot.county = updatedSpot.county;
  },
};