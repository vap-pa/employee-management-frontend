import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register employee
const register = async (employeeData) => {
  const response = await axios.post(`${API_URL}/register`, employeeData);
  if (response.data) {
    localStorage.setItem('employee', JSON.stringify(response.data));
  }
  return response.data;
};

// Login employee
const login = async (employeeData) => {
  const response = await axios.post(`${API_URL}/login`, employeeData);
  if (response.data) {
    localStorage.setItem('employee', JSON.stringify(response.data));
  }
  return response.data;
};

// Get current employee
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

// Logout employee
const logout = () => {
  localStorage.removeItem('employee');
};

const authService = {
  register,
  login,
  getMe,
  logout,
};

export default authService;