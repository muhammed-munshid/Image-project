import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { adminUrl } from '../../../API/api';

// eslint-disable-next-line react/prop-types
function AdminDashboard() {
    const [data, setData] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [employeeDetails, setEmployeeDetails] = useState({})
    console.log('emp: ', employeeDetails);

    const employeesData = async () => {
        try {
            const response = await axios.get(`${adminUrl}dashboard`);
            console.log('res:', response.data);
            setData(response.data.data)
        } catch (error) {
            console.log('error: ', error);
            // toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        employeesData();
    }, []);

    // const data = [
    //     { id: 1, name: 'John Doe', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
    //     { id: 2, name: 'Jane Smith', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
    //     { id: 3, name: 'Alice Johnson', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
    //     // Add more data as needed
    // ];

    const viewDetails = async (id) => {
        try {
            await axios.get(`${adminUrl}employee-details/${id}`).then((response) => {
                console.log('res: ', response);
                setEmployeeDetails(response.data.data);
            });
            setShowDetails(true);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US'); // Change 'en-US' to your preferred locale if needed
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
                            {/* <button onClick={handleGoBack} className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Go Back
                            </button> */}
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
                                    <tr key={item.id}>
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 border">{item.phone}</td>
                                        <td className="px-4 py-2 border">{item.email}</td>
                                        <td className="px-4 py-2 border">
                                            <button onClick={() => viewDetails(item._id)} className='px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700'>View</button>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className='px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700'>Block</button>
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
