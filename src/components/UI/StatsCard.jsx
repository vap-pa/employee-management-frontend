import { Link } from 'react-router-dom';

const StatsCard = ({ title, value, icon, link }) => {
  return (
    <Link to={link} className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </Link>
  );
};

export default StatsCard;