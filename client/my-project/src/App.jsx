import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import EmployeeLogin from './components/employee/pages/Login';
// import Dashboard from './components/employee/pages/Dashboard';
import DashboardParent from './components/employee/DashboardParent';
import AdminLogin from './components/admin/pages/AdminLogin';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import Details from './components/admin/pages/Details';
import EmployeeSignUp from './components/employee/pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './components/employee/Navbar';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeLogin />
            }
          />
          <Route
            path="/signUp"
            element={
              <EmployeeSignUp />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardParent />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLogin />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AdminDashboard />
            }
          />
          <Route
            path="/employee-details"
            element={
              <Details />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
