import Button from '../../components/UI/Button';

const ProjectCard = ({ project, onDelete, currentUserId }) => {
  const isTeamMember = project.teamMembers.some(member => member.id === currentUserId);
  const isCreator = project.createdBy === currentUserId;

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium">{project.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{project.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : project.status === 'in progress' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {project.teamMembers.length} members
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-600 px-4 py-3 flex justify-end space-x-2">
        <Button 
          size="small"
          onClick={() => window.location.href = `/projects/${project.id}`}
        >
          View
        </Button>
        
        {(isTeamMember || isCreator) && (
          <Button 
            size="small"
            onClick={() => window.location.href = `/projects/${project.id}/edit`}
          >
            Edit
          </Button>
        )}
        
        {isCreator && (
          <Button
            size="small"
            variant="danger"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;