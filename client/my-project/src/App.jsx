import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import EmployeeLogin from './components/employee/pages/Login';

function App() {

  return (
    <div>
      <BrowserRouter>
        {/* <Toaster position="top-center" /> */}
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeLogin />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
