/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { LoginSocialGoogle } from 'reactjs-social-login';
// import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { employeeUrl } from '../../../API/api';
// import Navbar from '../Navbar';

function EmployeeSignUp() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const employeeData = { email, password };

    const verifySignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${employeeUrl}signUp`, employeeData);
            console.log('res:', response);
            if (response.data.success) {
                // toast.success(response.data.message);
                navigate('/');
            } else if (response.data.noemployee) {
                // toast.error(response.data.message);
            } else {
                // toast.error(response.data.message);
            }
        } catch (error) {
            // toast.error('Something went wrong');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <div className="w-full max-w-md p-8 bg-gray-900 text-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>
                <form onSubmit={verifySignUp}>
                    <div className="mb-4">
                        <input
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={name}
                            className="block w-full p-4 text-lg rounded-sm bg-black"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="phone"
                            name="phone"
                            id="phone"
                            placeholder="Phone No"
                            value={phone}
                            className="block w-full p-4 text-lg rounded-sm bg-black"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
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
                    <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none mb-4">Sign Up</button>
                </form>
            </div>
        </div>
    );

}

export default EmployeeSignUp;
