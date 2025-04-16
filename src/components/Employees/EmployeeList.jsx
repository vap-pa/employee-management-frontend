import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ employees, onDelete, currentUserId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onDelete={onDelete}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default EmployeeList;