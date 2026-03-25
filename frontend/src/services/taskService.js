import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getTasks = async () => {
  const response = await axios.get(`${BASE_URL}/api/tasks`);
  return response.data;
};

const addTask = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/tasks`, data);
  return response.data;
};

const updateTask = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/api/tasks/${id}`, data);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/tasks/${id}`);
  return response.data;
};

const toggleStatus = async (id) => {
  const response = await axios.patch(`${BASE_URL}/api/tasks/${id}/toggle`);
  return response.data;
};

export default { getTasks, addTask, updateTask, deleteTask, toggleStatus };
