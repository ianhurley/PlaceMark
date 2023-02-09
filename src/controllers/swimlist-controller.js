import { db } from "../models/db.js";

export const swimlistController = {
  index: {
    handler: async function (request, h) {
      const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
      const viewData = {
        title: "Swimlist",
        swimlist: swimlist,
      };
      return h.view("swimlist-view", viewData);
    },
  },

  addSpot: {
    handler: async function (request, h) {
      const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
      const newSpot = {
        spot: request.payload.spot,
        region: request.payload.region,
        county: request.payload.county,
      };
      await db.spotStore.addSpot(swimlist._id, newSpot);
      return h.redirect(`/swimlist/${swimlist._id}`);
    },
  },
};