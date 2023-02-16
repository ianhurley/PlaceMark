import Boom from "@hapi/boom";
import { db } from "../models/db.js";

// import { maggie, leinster, testSwimlists } from "../fixtures.js";

export const swimlistApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const swimlists = await db.swimlistStore.getAllSwimlists();
        return swimlists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
        if (!swimlist) {
          return Boom.notFound("No Swimlist with this id");
        }
        return swimlist;
      } catch (err) {
        return Boom.serverUnavailable("No Swimlist with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const swimlist = request.payload;
        const newSwimlist = await db.swimlistStore.addSwimlist(swimlist);
        if (newSwimlist) {
          return h.response(newSwimlist).code(201);
        }
        return Boom.badImplementation("error creating swimlist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
        if (!swimlist) {
          return Boom.notFound("No Swimlist with this id");
        }
        await db.swimlistStore.deleteSwimlistById(swimlist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Swimlist with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.swimlistStore.deleteAllSwimlists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};