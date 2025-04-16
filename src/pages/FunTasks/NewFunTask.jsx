import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FunTaskForm from '../../components/FunTasks/FunTaskForm';
import Alert from '../../components/UI/Alert';
import funTaskService from '../../api/funTasks';

const NewFunTask = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      await funTaskService.createFunTask(taskData, employee.token);
      navigate('/fun-tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Fun Task</h1>
        <button
          onClick={() => navigate('/fun-tasks')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <FunTaskForm onSubmit={handleSubmit} loading={loading} employees={[]} />
      </div>
    </div>
  );
};

export default NewFunTask;