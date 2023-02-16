import { userApi } from "./api/user-api.js";
import { swimlistApi } from "./api/swimlist-api.js";
import { spotApi } from "./api/spot-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/swimlists", config: swimlistApi.create },
  { method: "DELETE", path: "/api/swimlists", config: swimlistApi.deleteAll },
  { method: "GET", path: "/api/swimlists", config: swimlistApi.find },
  { method: "GET", path: "/api/swimlists/{id}", config: swimlistApi.findOne },
  { method: "DELETE", path: "/api/swimlists/{id}", config: swimlistApi.deleteOne },

  { method: "GET", path: "/api/spots", config: spotApi.find },
  { method: "GET", path: "/api/spots/{id}", config: spotApi.findOne },
  { method: "POST", path: "/api/swimlists/{id}/spots", config: spotApi.create },
  { method: "DELETE", path: "/api/spots", config: spotApi.deleteAll },
  { method: "DELETE", path: "/api/spots/{id}", config: spotApi.deleteOne },
];