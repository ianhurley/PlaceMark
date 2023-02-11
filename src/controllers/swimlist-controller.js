import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("swimlist-view", { title: "Add spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
      const newSpot = {
        name: request.payload.name,
        categorey: request.payload.categorey,
        description: request.payload.description,
      };
      await db.spotStore.addSpot(swimlist._id, newSpot);
      return h.redirect(`/swimlist/${swimlist._id}`);
    },
  },

  deleteSpot: {
    handler: async function(request, h) {
      const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
      await db.spotStore.deleteSpot(request.params.spotid);
      return h.redirect(`/swimlist/${swimlist._id}`);
    },
  },
};