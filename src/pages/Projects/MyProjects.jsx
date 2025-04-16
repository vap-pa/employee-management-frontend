import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../api/projects';
import ProjectList from '../../pages/Projects/ProjectList';
import Alert from '../../components/UI/Alert';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getEmployeeProjects(employee.id, employee.token);
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [employee.id, employee.token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <ProjectList projects={projects} />
    </div>
  );
};

export default MyProjects;