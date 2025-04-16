import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

// Get all leaves
const getLeaves = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get employee's leaves
const getEmployeeLeaves = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/employee/${employeeId}`, config);
  return response.data;
};

// Create leave
const createLeave = async (leaveData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, leaveData, config);
  return response.data;
};

// Update leave status
const updateLeaveStatus = async (leaveId, statusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${leaveId}/status`, statusData, config);
  return response.data;
};

// Delete leave
const deleteLeave = async (leaveId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${leaveId}`, config);
  return response.data;
};

const leaveService = {
  getLeaves,
  getEmployeeLeaves,
  createLeave,
  updateLeaveStatus,
  deleteLeave,
};

export default leaveService;