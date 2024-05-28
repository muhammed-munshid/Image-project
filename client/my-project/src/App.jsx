import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import EmployeeLogin from './components/employee/pages/Login';
// import Dashboard from './components/employee/pages/Dashboard';
import DashboardParent from './components/employee/DashboardParent';
import AdminLogin from './components/admin/pages/AdminLogin';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import Details from './components/admin/pages/Details';
import EmployeeSignUp from './components/employee/pages/SignUp';
// import Navbar from './components/employee/Navbar';
// import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <BrowserRouter>
        {/* <Toaster position="top-center" /> */}
        <Routes>
          {/* <ToastContainer position="top-center"/> */}
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
