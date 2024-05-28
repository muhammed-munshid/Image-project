/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminUrl } from '../../../API/api';
import { toast } from 'react-toastify';
import axios from 'axios';

function AdminLogin() {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const employeeData = { email, password };

  const verifyLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${adminUrl}signIn`, employeeData);
      console.log('res:', response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin-dashboard');
      } else if(response.data.incEmail) {
        console.log('Incorrect Email or Password');
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error('Something went wrong');
    }
  };

return (
  <div className="h-screen flex items-center justify-center bg-slate-950">
    <div className="w-full max-w-md p-8 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Login</h1>
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
          {/* <Link to="/forgot">Forgot your password?</Link> */}
        </div>
        <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none mb-4">Sign In</button>
        {/* <p className="text-center text-gray-100 mb-4">or use your google account</p> */}
        {/* Add your Google Login button here */}
      </form>
    </div>
  </div>
);

}

export default AdminLogin;
