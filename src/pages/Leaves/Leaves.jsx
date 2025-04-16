import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import leaveService from '../../api/leaves';
import LeaveList from '../../pages/Leaves/LeaveList';
import Button from '../../components/UI/Button';
import Alert from '../../components/UI/Alert';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await leaveService.getLeaves(employee.token);
        setLeaves(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch leaves');
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [employee.token]);

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      await leaveService.updateLeaveStatus(leaveId, { status }, employee.token);
      setLeaves(leaves.map(leave => 
        leave._id === leaveId ? { ...leave, status } : leave
      ));
    } catch (err) {
      setError(err.message || 'Failed to update leave status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Requests</h1>
        <Button onClick={() => navigate('/leaves/new')}>Request Leave</Button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <LeaveList 
        leaves={leaves} 
        onStatusUpdate={handleStatusUpdate}
        isAdmin={employee.role === 'admin'}
      />
    </div>
  );
};

export default Leaves;