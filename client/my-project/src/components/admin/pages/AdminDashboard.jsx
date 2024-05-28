import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { adminUrl } from '../../../API/api';
import { toast } from 'react-toastify';

function AdminDashboard() {
    const [data, setData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [blockedStatus, setBlockedStatus] = useState({});

    const employeesData = async () => {
        try {
            const response = await axios.get(`${adminUrl}dashboard`);
            console.log('res:', response.data);
            setData(response.data.data);
            // Initialize blocked status for each employee
            const initialBlockedStatus = response.data.data.reduce((acc, employee) => {
                acc[employee._id] = employee.isBlocked || false;
                return acc;
            }, {});
            setBlockedStatus(initialBlockedStatus);
        } catch (error) {
            console.log('error: ', error);
            // toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        employeesData();
    }, []);

    const viewDetails = async (id) => {
        try {
            const response = await axios.get(`${adminUrl}employee-details/${id}`);
            console.log('res: ', response);
            setEmployeeDetails(response.data.data);
            setShowDetails(true);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US'); // Change 'en-US' to your preferred locale if needed
    };

    const toggleBlock = async (id) => {
        const currentStatus = blockedStatus[id];
        try {
            const response = await axios.post(`${adminUrl}block-employee/${id}`, { block: !currentStatus });
            console.log(response);
            if (response.data.block) {
                toast.success(response.data.message);
            } else if (response.data.unBlock) {
                toast.success(response.data.message);
            }
            setBlockedStatus((prevStatus) => ({
                ...prevStatus,
                [id]: !currentStatus,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-start justify-center h-screen">
                {showDetails ? (
                    <div className="flex flex-col max-h-screen">
                        <div className="flex flex-row justify-between items-center my-8">
                            <h1 className="text-3xl font-bold">Details of {employeeDetails.name}</h1>
                            <button onClick={() => setShowDetails(false)} className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Go Back
                            </button>
                        </div>
                        <table className="table-auto bg-white rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">SI No</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Total Time</th>
                                    <th className="px-4 py-2 border">Break Time</th>
                                    <th className="px-4 py-2 border">Working Time</th>
                                    <th className="px-4 py-2 border">P/L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeDetails.attendance.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{formatDate(item.issue_date)}</td>
                                        <td className="px-4 py-2 border">{item.total_time}</td>
                                        <td className="px-4 py-2 border">{item.break_time}</td>
                                        <td className="px-4 py-2 border">{item.working_time}</td>
                                        <td className="px-4 py-2 border">
                                            <button className='px-3 py-1 text-white bg-green-500 rounded hover:bg-green-700'>Present</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col max-h-screen">
                        <div className="my-8">
                            <h1 className="text-3xl font-bold text-center">Employees</h1>
                        </div>
                        <table className="table-auto bg-white rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">SI No</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Phone Number</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Details</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item._id}>
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 border">{item.phone}</td>
                                        <td className="px-4 py-2 border">{item.email}</td>
                                        <td className="px-4 py-2 border">
                                            <button onClick={() => viewDetails(item._id)} className='px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700'>View</button>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                className={`px-3 py-1 text-white rounded hover:bg-${blockedStatus[item._id] ? 'green' : 'red'}-700`}
                                                onClick={() => toggleBlock(item._id)}
                                                style={{ backgroundColor: blockedStatus[item._id] ? '#16a34a' : '#dc2626' }}
                                            >
                                                {blockedStatus[item._id] ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
