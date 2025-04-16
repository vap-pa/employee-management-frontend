import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// Get all projects
const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get employee's projects
const getEmployeeProjects = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/employee/${employeeId}`, config);
  return response.data;
};

// Create project
const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

// Update project
const updateProject = async (projectId, projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${projectId}`, projectData, config);
  return response.data;
};

// Delete project
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${projectId}`, config);
  return response.data;
};

// Add project task
const addProjectTask = async (projectId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/${projectId}/tasks`, taskData, config);
  return response.data;
};

// Update project task
const updateProjectTask = async (projectId, taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${projectId}/tasks/${taskId}`, taskData, config);
  return response.data;
};

// Delete project task
const deleteProjectTask = async (projectId, taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${projectId}/tasks/${taskId}`, config);
  return response.data;
};

const projectService = {
  getProjects,
  getEmployeeProjects,
  createProject,
  updateProject,
  deleteProject,
  addProjectTask,
  updateProjectTask,
  deleteProjectTask,
};

export default projectService;