import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmployeeForm from '../../pages/Employees/EmployeeForm';
import Alert from '../../components/UI/Alert';
import employeeService from '../../api/employees';

const NewEmployee = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      await employeeService.register(formData, employee.token);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Employee</h1>
        <button
          onClick={() => navigate('/employees')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <EmployeeForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default NewEmployee;