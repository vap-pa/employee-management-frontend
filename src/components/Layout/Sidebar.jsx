import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const navItems = [
    { path: '/', name: 'Dashboard', icon: '🏠' },
    { path: '/employees', name: 'Employees', icon: '👥', adminOnly: true },
    { path: '/fun-tasks', name: 'Fun Tasks', icon: '🎯' },
    { path: '/fun-tasks/my', name: 'My Tasks', icon: '✅' },
    { path: '/leaves', name: 'Leaves', icon: '🏖️' },
    { path: '/leaves/my', name: 'My Leaves', icon: '📅' },
    { path: '/projects', name: 'Projects', icon: '📊' },
    { path: '/projects/my', name: 'My Projects', icon: '🔧' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg transition ${isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-indigo-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;