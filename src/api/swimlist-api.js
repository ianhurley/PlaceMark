import Boom from "@hapi/boom";
import { IdSpec, SwimlistArraySpec, SwimlistSpec, SwimlistSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

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
    tags: ["api"],
    response: { schema: SwimlistArraySpec, failAction: validationError },
    description: "Get all swimlists",
    notes: "Returns all swimlists",
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
    tags: ["api"],
    description: "Find a Swimlist",
    notes: "Returns a swimlist",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SwimlistSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Create a Swimlist",
    notes: "Returns the newly created swimlist",
    validate: { payload: SwimlistSpec, failAction: validationError },
    response: { schema: SwimlistSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Delete a swimlist",
    validate: { params: { id: IdSpec }, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all SwimlistApi",
  },
};