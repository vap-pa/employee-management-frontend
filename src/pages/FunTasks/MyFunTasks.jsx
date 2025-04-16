import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import funTaskService from '../../api/funTasks';
import FunTaskList from '../../components/FunTasks/FunTaskList';
import Alert from '../../components/UI/Alert';

const MyFunTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await funTaskService.getEmployeeFunTasks(employee._id, employee.token);
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [employee._id, employee.token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Fun Tasks</h1>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <FunTaskList tasks={tasks} />
    </div>
  );
};

export default MyFunTasks;