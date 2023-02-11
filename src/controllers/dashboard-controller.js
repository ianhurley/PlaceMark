import { db } from "../models/db.js";
import { SwimlistSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const swimlists = await db.swimlistStore.getUserSwimlists(loggedInUser._id); 
      const viewData = {
        title: "Wild Swimming Dashboard",
        user: loggedInUser,
        swimlists: swimlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addSwimlist: {
    validate: {
      payload: SwimlistSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Swimlist error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newSwimList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.swimlistStore.addSwimlist(newSwimList);
      return h.redirect("/dashboard");
    },
  },

  deleteSwimlist: {
    handler: async function (request, h) {
      const swimlist = await db.swimlistStore.getSwimlistById(request.params.id);
      await db.swimlistStore.deleteSwimlistById(swimlist._id);
      return h.redirect("/dashboard");
    },
  },
};