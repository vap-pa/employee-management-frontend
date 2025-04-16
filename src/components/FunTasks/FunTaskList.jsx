import FunTaskCard from './FunTaskCard';

const FunTaskList = ({ tasks, onDelete, currentUserId }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <FunTaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default FunTaskList;