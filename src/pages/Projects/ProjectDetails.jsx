import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../api/projects';
import Button from '../../components/UI/Button';
import Alert from '../../components/UI/Alert';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProject(id, employee.token);
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch project');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, employee.token]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
      </div>
      
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Timeline</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Start Date:</span> {new Date(project.startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">End Date:</span> {new Date(project.endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status:</span> <span className="capitalize">{project.status}</span>
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Team Members</h2>
            <div className="space-y-2">
              {project.teamMembers.map(member => (
                <p key={member.id}>{member.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        {/* Task list would go here */}
        <p className="text-gray-500">No tasks yet</p>
      </div>
    </div>
  );
};

export default ProjectDetails;