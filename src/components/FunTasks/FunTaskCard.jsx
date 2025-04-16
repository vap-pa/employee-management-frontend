import Button from '../UI/Button';

const FunTaskCard = ({ task, onDelete, currentUserId }) => {
  const isAssignedToMe = task.assignedTo === currentUserId;
  const isCreator = task.createdBy === currentUserId;

  return (
    <div className={`bg-white dark:bg-gray-700 rounded-lg shadow p-4 border-l-4 ${
      task.status === 'completed' ? 'border-green-500' : 'border-indigo-500'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Points: <span className="font-medium">{task.points}</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status: <span className="font-medium capitalize">{task.status}</span>
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          {(isAssignedToMe || isCreator) && (
            <Button size="small" onClick={() => window.location.href = `/fun-tasks/${task.id}/edit`}>
              Edit
            </Button>
          )}
          {isCreator && (
            <Button
              size="small"
              variant="danger"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunTaskCard;