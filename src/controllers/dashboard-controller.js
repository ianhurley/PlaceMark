import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const swimlists = await db.swimlistStore.getAllSwimlists();
      const viewData = {
        title: "Wild Swimming Dashboard",
        swimlists: swimlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addSwimlist: {
    handler: async function (request, h) {
      const newSwimList = {
        title: request.payload.title,
      };
      await db.swimlistStore.addSwimlist(newSwimList);
      return h.redirect("/dashboard");
    },
  },
};