import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/UI/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Employees from './pages/Employees/Employees';
import EmployeeDetails from './pages/Employees/EmployeeDetails';
import NewEmployee from './pages/Employees/NewEmployee';
import FunTasks from './pages/FunTasks/FunTasks';
import MyFunTasks from './pages/FunTasks/MyFunTasks';
import NewFunTask from './pages/FunTasks/NewFunTask';
import Leaves from './pages/Leaves/Leaves';
import MyLeaves from './pages/Leaves/MyLeaves';
import NewLeave from './pages/Leaves/NewLeave';
import Projects from './pages/Projects/Projects';
import MyProjects from './pages/Projects/MyProjects';
import NewProject from './pages/Projects/NewProject';
import ProjectDetails from './pages/Projects/ProjectDetails';

// Or wherever your Tailwind CSS file is
import './styles/main.css';
import './styles/theme.css';

function App() {
  return (
    <>
  <AuthProvider>
  <Router>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Employees Routes */}
            <Route path="/employees" element={<ProtectedRoute adminOnly><Employees /></ProtectedRoute>} />
            <Route path="/employees/new" element={<ProtectedRoute adminOnly><NewEmployee /></ProtectedRoute>} />
            <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
            
            {/* Fun Tasks Routes */}
            <Route path="/fun-tasks" element={<ProtectedRoute><FunTasks /></ProtectedRoute>} />
            <Route path="/fun-tasks/my" element={<ProtectedRoute><MyFunTasks /></ProtectedRoute>} />
            <Route path="/fun-tasks/new" element={<ProtectedRoute><NewFunTask /></ProtectedRoute>} />
            
            {/* Leaves Routes */}
            <Route path="/leaves" element={<ProtectedRoute><Leaves /></ProtectedRoute>} />
            <Route path="/leaves/my" element={<ProtectedRoute><MyLeaves /></ProtectedRoute>} />
            <Route path="/leaves/new" element={<ProtectedRoute><NewLeave /></ProtectedRoute>} />
            
            {/* Projects Routes */}
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/projects/my" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
            <Route path="/projects/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          </Route>
        </Routes>
     
    </Router> </AuthProvider></>
  );
}

export default App;