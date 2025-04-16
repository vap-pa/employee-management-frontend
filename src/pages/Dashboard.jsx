import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import employeeService from '../api/employees';
import funTaskService from '../api/funTasks';
import leaveService from '../api/leaves';
import projectService from '../api/projects';
import StatsCard from '../components/UI/StatsCard';

const Dashboard = () => {
  const { employee } = useAuth();
  const [stats, setStats] = useState({
    employees: 0,
    funTasks: 0,
    leaves: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employeesRes, funTasksRes, leavesRes, projectsRes] = await Promise.all([
          employeeService.getEmployees(employee.token),
          funTaskService.getFunTasks(employee.token),
          leaveService.getLeaves(employee.token),
          projectService.getProjects(employee.token),
        ]);

        setStats({
          employees: employeesRes.length,
          funTasks: funTasksRes.length,
          leaves: leavesRes.length,
          projects: projectsRes.length,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [employee.token]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {employee.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Employees" value={stats.employees} icon="👥" link="/employees" />
        <StatsCard title="Fun Tasks" value={stats.funTasks} icon="🎯" link="/fun-tasks" />
        <StatsCard title="Leave Requests" value={stats.leaves} icon="🏖️" link="/leaves" />
        <StatsCard title="Active Projects" value={stats.projects} icon="📊" link="/projects" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          {/* Activity feed would go here */}
          <p className="text-gray-500">No recent activities</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
          {/* Task list would go here */}
          <p className="text-gray-500">No pending tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;