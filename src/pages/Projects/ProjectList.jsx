import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, onDelete, currentUserId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          project={project}
          onDelete={onDelete}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default ProjectList;