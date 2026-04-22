import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Leads APIs
export const getLeads = (params) => API.get("/leads", { params });

export const getLeadById = (id) => API.get(`/leads/${id}`);

export const createLead = (data) => API.post("/leads", data);

export const updateLead = (id, data) => API.put(`/leads/${id}`, data);

export const deleteLead = (id) => API.delete(`/leads/${id}`);

export const addNote = (id, data) =>
  API.post(`/leads/${id}/notes`, data);

export const getDashboardStats = () =>
  API.get("/leads/dashboard/stats");