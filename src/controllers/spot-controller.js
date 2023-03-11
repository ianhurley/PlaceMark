import { SpotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
      const spot = await db.spotStore.getSpotById(request.params.spotid);
      const viewData = {
        title: "Edit Spot",
        swimlist: swimlist,
        spot: spot,
      };
      return h.view("spot-view", viewData);
    },
  },

  update: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("spot-view", { title: "Edit spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.spotid);
      const newSpot = {
        name: request.payload.name,
        county: request.payload.county,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        categorey: request.payload.categorey,
      };
      await db.spotStore.updateSpot(spot, newSpot);
      return h.redirect(`/swimlist/${request.params.id}`);
    },
  },
};