import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedEmployee = JSON.parse(localStorage.getItem('employee'));
      if (storedEmployee?.token) {
        try {
          const employeeData = await authService.getMe(storedEmployee.token);
          setEmployee({ ...employeeData, token: storedEmployee.token });
        } catch (error) {
          localStorage.removeItem('employee');
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const employeeData = await authService.login({ email, password });
    setEmployee(employeeData);
    return employeeData;
  };

  const register = async (employeeData) => {
    const newEmployee = await authService.register(employeeData);
    setEmployee(newEmployee);
    return newEmployee;
  };

  const logout = () => {
    authService.logout();
    setEmployee(null);
  };

  return (
    <AuthContext.Provider
      value={{
        employee,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!employee,
        isAdmin: employee?.role === 'admin',
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);