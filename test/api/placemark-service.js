import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async createSwimlist(swimlist) {
    const res = await axios.post(`${this.placemarkUrl}/api/swimlists`, swimlist);
    return res.data;
  },

  async deleteAllSwimlists() {
    const response = await axios.delete(`${this.placemarkUrl}/api/swimlists`);
    return response.data;
  },

  async deleteSwimlist(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/swimlists/${id}`);
    return response;
  },

  async getAllSwimlists() {
    const res = await axios.get(`${this.placemerkUrl}/api/swimlists`);
    return res.data;
  },

  async getSwimlist(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/swimlists/${id}`);
    return res.data;
  },

  async getAllSpots() {
    const res = await axios.get(`${this.placemarkUrl}/api/spots`);
    return res.data;
  },

  async createSpot(id, spot) {
    const res = await axios.post(`${this.placemarkUrl}/api/swimlists/${id}/spots`, spot);
    return res.data;
  },

  async deleteAllSpots() {
    const res = await axios.delete(`${this.placemarkUrl}/api/spots`);
    return res.data;
  },

  async getSpot(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/spots/${id}`);
    return res.data;
  },

  async deleteSpot(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/spots/${id}`);
    return res.data;
  },
};