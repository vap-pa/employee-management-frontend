import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Get all employees
const getEmployees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single employee
const getEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${employeeId}`, config);
  return response.data;
};

// Update employee
const updateEmployee = async (employeeId, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${employeeId}`, employeeData, config);
  return response.data;
};

// Delete employee
const deleteEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${employeeId}`, config);
  return response.data;
};

const employeeService = {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;