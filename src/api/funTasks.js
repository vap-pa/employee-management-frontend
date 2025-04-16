import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fun-tasks';

// Get all fun tasks
const getFunTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get employee's fun tasks
const getEmployeeFunTasks = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/employee/${employeeId}`, config);
  return response.data;
};

// Create fun task
const createFunTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

// Update fun task
const updateFunTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${taskId}`, taskData, config);
  return response.data;
};

// Delete fun task
const deleteFunTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${taskId}`, config);
  return response.data;
};

const funTaskService = {
  getFunTasks,
  getEmployeeFunTasks,
  createFunTask,
  updateFunTask,
  deleteFunTask,
};

export default funTaskService;