import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import EmployeeLogin from './components/employee/pages/Login';
// import Dashboard from './components/employee/pages/Dashboard';
import DashboardParent from './components/employee/DashboardParent';
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
            path="/dashboard"
            element={
              <DashboardParent />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
