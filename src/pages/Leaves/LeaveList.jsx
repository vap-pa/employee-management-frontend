import LeaveCard from './LeaveCard';

const LeaveList = ({ leaves = [], onStatusUpdate, isAdmin }) => {
  // Check if leaves is an array, otherwise return an empty array
  if (!Array.isArray(leaves)) {
    return <div>No leaves to display.</div>;
  }

  return (
    <div className="space-y-4">
      {leaves.length === 0 ? (
        <div>No leave requests found.</div>
      ) : (
        leaves.map(leave => (
          <LeaveCard
            key={leave.id}
            leave={leave}
            onStatusUpdate={onStatusUpdate}
            isAdmin={isAdmin}
          />
        ))
      )}
    </div>
  );
};

export default LeaveList;
