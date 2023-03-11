import { db } from "../models/db.js";
import { SpotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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
        county: request.payload.county,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        categorey: request.payload.categorey,
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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          swimlist.img = url;
          await db.swimlistStore.updateSwimlist(swimlist);
        }
        return h.redirect(`/swimlist/${swimlist._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/swimlist/${swimlist._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};