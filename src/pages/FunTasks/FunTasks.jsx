import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import funTaskService from '../../api/funTasks';
import FunTaskList from '../../components/FunTasks/FunTaskList';
import Button from '../../components/UI/Button';
import Alert from '../../components/UI/Alert';

const FunTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await funTaskService.getFunTasks(employee.token);
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [employee.token]);

  const handleDelete = async (id) => {
    try {
      await funTaskService.deleteFunTask(id, employee.token);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Fun Tasks</h1>
        <Button onClick={() => navigate('/fun-tasks/new')}>Create Task</Button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <FunTaskList 
        tasks={tasks} 
        onDelete={handleDelete} 
        currentUserId={employee.id}
      />
    </div>
  );
};

export default FunTasks;