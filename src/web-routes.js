import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { swimlistController } from "./controllers/swimlist-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "POST", path: "/dashboard/addswimlist", config: dashboardController.addSwimlist },

  { method: "GET", path: "/swimlist/{id}", config: swimlistController.index },
  { method: "POST", path: "/swimlist/{id}/addspot", config: swimlistController.addSpot },

  { method: "GET", path: "/dashboard/deleteswimlist/{id}", config: dashboardController.deleteSwimlist },
  { method: "GET", path: "/swimlist/{id}/deletespot/{spotid}", config: swimlistController.deleteSpot },
];