import FunTaskCard from './FunTaskCard';

const FunTaskList = ({ tasks = [], onDelete, currentUserId }) => {
  return (
    <div className="space-y-4">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <FunTaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <p>No tasks available</p> // Fallback message when no tasks are available
      )}
    </div>
  );
};

export default FunTaskList;
