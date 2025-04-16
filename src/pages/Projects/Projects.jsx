import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../api/projects';
import ProjectList from '../../pages/Projects/ProjectList';
import Button from '../../components/UI/Button';
import Alert from '../../components/UI/Alert';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects(employee.token);
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [employee.token]);

  const handleDelete = async (id) => {
    try {
      await projectService.deleteProject(id, employee.token);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Projects</h1>
        <Button onClick={() => navigate('/projects/new')}>Create Project</Button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <ProjectList 
        projects={projects} 
        onDelete={handleDelete}
        currentUserId={employee._id}
      />
    </div>
  );
};

export default Projects;