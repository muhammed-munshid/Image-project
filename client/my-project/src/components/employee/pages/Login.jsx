/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { LoginSocialGoogle } from 'reactjs-social-login';
// import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
// import { employeeUrl } from '../../../API/Api';
// import Navbar from '../Navbar';

function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const employeeData = { email, password };

  const verifyLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${employeeUrl}login`, employeeData);
      console.log('res:', response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
        localStorage.setItem('token', response.data.data);
      } else if (response.data.noemployee) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

//   const responseGoogle = (response) => {
//     console.log('Hello');
//     console.log(response);
//     // Handle the response, e.g., send it to the backend for verification
//   };

return (
  <div className="h-screen flex items-center justify-center bg-slate-950">
    <div className="w-full max-w-md p-8 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
      <form onSubmit={verifyLogin}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            className="block w-full p-4 text-lg rounded-sm bg-black"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            className="block w-full p-4 text-lg rounded-sm bg-black"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-left text-gray-400 hover:underline hover:text-gray-100 mb-4">
          <Link to="/forgot">Forgot your password?</Link>
        </div>
        <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none mb-4">Sign In</button>
        <hr className="my-3" />
        <p className="text-center text-gray-100 mb-4">or use your google account</p>
        {/* Add your Google Login button here */}
        <div className="mt-7 flex justify-center text-gray-400">
          <p>No register in account?</p>
          <Link to="/signUp" className="ml-2 text-lg hover:underline hover:text-gray-100">Sign Up</Link>
        </div>
      </form>
    </div>
  </div>
);

}

export default EmployeeLogin;
