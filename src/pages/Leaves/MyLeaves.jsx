import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import leaveService from '../../api/leaves';
import LeaveList from '../../pages/Leaves/LeaveList';
import Alert from '../../components/UI/Alert';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await leaveService.getEmployeeLeaves(employee.id, employee.token);
        setLeaves(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch leaves');
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [employee.id, employee.token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Leave Requests</h1>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <LeaveList leaves={leaves} />
    </div>
  );
};

export default MyLeaves;