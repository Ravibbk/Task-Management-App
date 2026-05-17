import axiosInstance from "./axiosInstance";

export const getTasks = (params) => axiosInstance.get("/tasks", { params });
export const getTaskById = (id) => axiosInstance.get(`/tasks/${id}`);
export const createTask = (data) => axiosInstance.post("/tasks", data);
export const updateTask = (id, data) => axiosInstance.put(`/tasks/${id}`, data);
export const deleteTaskApi = (id) => axiosInstance.delete(`/tasks/${id}`);
export const uploadTaskFiles = (id, formData) =>
  axiosInstance.post(`/tasks/${id}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
