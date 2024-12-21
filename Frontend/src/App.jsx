import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './app.css';
import LoginForm from './pages/LoginForm';
import Forgot from './pages/Forgot';
import SignupForm from './pages/SignupForm';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Viewer from './pages/Viewer';
import AccessRole from './pages/AccessRole';
import SideNav from './components/SideNav';
import CustomerDetails from './components/CustomerDetails';
import AddData from './pages/AddData'; 

// ProtectedRoute example for authenticated pages
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to='/LoginForm' />;
};

function App() {
  const location = useLocation();

  const noSidebarPaths = ['/', '/LoginForm', '/SignupForm', '/Forgot'];

  return (
    <div className='page'>
      {!noSidebarPaths.includes(location.pathname) && <SideNav />}
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LoginForm />} />
        <Route path='/records/:id' element={<CustomerDetails />} />
        <Route path='/LoginForm' element={<LoginForm />} />
        <Route path='/Forgot' element={<Forgot />} />
        <Route path='/SignupForm' element={<SignupForm />} />

        {/* Private Routes */}
        <Route
          path='/Dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Add-data'
          element={
            <ProtectedRoute>
              <AddData />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Customer'
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Viewer'
          element={
            <ProtectedRoute>
              <Viewer />
            </ProtectedRoute>
          }
        />
        <Route
          path='/AccessRole'
          element={
            <ProtectedRoute>
              <AccessRole />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
