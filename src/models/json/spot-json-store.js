import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/spots.json"));
db.data = { spots: [] };

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async addSpot(swimlistId, spot) {
    await db.read();
    spot._id = v4();
    spot.swimlistid = swimlistId;
    db.data.spots.push(spot);
    await db.write();
    return spot;
  },

  async getSpotsBySwimlistId(id) {
    await db.read();
    return db.data.spots.filter((spot) => spot.swimlistid === id);
  },

  async getSpotById(id) {
    await db.read();
    return db.data.spots.find((spot) => spot._id === id);
  },

  async deleteSpot(id) {
    await db.read();
    const index = db.data.spots.findIndex((spot) => spot._id === id);
    db.data.spots.splice(index, 1);
    await db.write();
  },

  async deleteAllSpots() {
    db.data.spots = [];
    await db.write();
  },

  async updateSpot(spot, updatedSpot) {
    spot.name = updatedSpot.name;
    spot.county = updatedSpot.county;
    spot.latitude = updatedSpot.latitude;
    spot.longitude = updatedSpot.longitude;
    spot.categorey = updatedSpot.categorey;
    await db.write();
  },
};