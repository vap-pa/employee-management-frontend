import Button from '../UI/Button';

const EmployeeCard = ({ employee, onDelete, currentUserId }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <span className="text-indigo-600 dark:text-indigo-300 font-medium">
              {employee.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {employee.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {employee.position} • {employee.department}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            size="small"
            onClick={() => window.location.href = `/employees/${employee.id}`}
          >
            View
          </Button>
          {employee.id !== currentUserId && (
            <Button
              size="small"
              variant="danger"
              onClick={() => onDelete(employee.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;