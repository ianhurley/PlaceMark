import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const spotApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const spots = await db.spotStore.getAllSpots();
        return spots;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        return spot;
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.addSpot(request.params.id, request.payload);
        if (spot) {
          return h.response(spot).code(201);
        }
        return Boom.badImplementation("error creating spot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.spotStore.deleteAllSpots();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No Spot with this id");
        }
        await db.spotStore.deleteSpot(spot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Spot with this id");
      }
    },
  },
};