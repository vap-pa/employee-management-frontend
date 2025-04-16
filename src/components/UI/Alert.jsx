import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Alert = ({ type = 'info', message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const alertClasses = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 mb-4 rounded-lg ${alertClasses[type]} flex justify-between items-center`}>
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose && onClose();
        }}
        className="ml-2 p-1 rounded-full hover:bg-opacity-30 hover:bg-current"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Alert;