import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LeaveForm from '../../pages/Leaves/LeaveForm';
import Alert from '../../components/UI/Alert';
import leaveService from '../../api/leaves';

const NewLeave = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (leaveData) => {
    try {
      setLoading(true);
      setError(null);
      await leaveService.createLeave(leaveData, employee.token);
      navigate('/leaves/my');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create leave request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Request New Leave</h1>
        <button
          onClick={() => navigate('/leaves')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <LeaveForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default NewLeave;