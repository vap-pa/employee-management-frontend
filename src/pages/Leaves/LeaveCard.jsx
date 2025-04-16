import Button from '../../components/UI/Button';

const LeaveCard = ({ leave, onStatusUpdate, isAdmin }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{leave.employee.name}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[leave.status]}`}>
              {leave.status}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Type: <span className="font-medium capitalize">{leave.leaveType}</span>
            </span>
          </div>
          {leave.reason && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Reason: {leave.reason}
            </p>
          )}
        </div>
        
        {isAdmin && leave.status === 'pending' && (
          <div className="flex space-x-2">
            <Button
              size="small"
              variant="success"
              onClick={() => onStatusUpdate(leave._id, 'approved')}
            >
              Approve
            </Button>
            <Button
              size="small"
              variant="danger"
              onClick={() => onStatusUpdate(leave._id, 'rejected')}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveCard;