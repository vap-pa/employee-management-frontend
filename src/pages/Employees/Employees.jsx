import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/UI/Alert';
import EmployeeList from '../../components/Employees/EmployeeList';
import employeeService from '../../api/employees';
import Button from '../../components/UI/Button';





const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getEmployees(employee.token);
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [employee.token]);

  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id, employee.token);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete employee');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Button onClick={() => navigate('/employees/new')}>Add Employee</Button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <EmployeeList
        employees={employees} 
        onDelete={handleDelete} 
        currentUserId={employee.id}
      />
    </div>
  );
};

export default Employees;