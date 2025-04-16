import LeaveCard from './LeaveCard';

const LeaveList = ({ leaves, onStatusUpdate, isAdmin }) => {
  return (
    <div className="space-y-4">
      {leaves.map(leave => (
        <LeaveCard
          key={leave._id}
          leave={leave}
          onStatusUpdate={onStatusUpdate}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default LeaveList;