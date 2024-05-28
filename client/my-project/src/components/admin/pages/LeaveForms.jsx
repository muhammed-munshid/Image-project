import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { adminUrl } from '../../../API/api';

// eslint-disable-next-line react/prop-types
function LeaveForms() {
    const [data, setData] = useState([])
    // const [showDetails, setShowDetails] = useState(false)
    // const [employeeDetails, setEmployeeDetails] = useState({})
    // console.log('emp: ', employeeDetails);

    const adminData = async () => {
        try {
            const response = await axios.get(`${adminUrl}leave-forms`);
            console.log('res:', response.data);
            setData(response.data.data)
        } catch (error) {
            console.log('error: ', error);
            // toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        adminData();
    }, []);

    // const data = [
    //     { id: 1, name: 'John Doe', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
    //     { id: 2, name: 'Jane Smith', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
    //     { id: 3, name: 'Alice Johnson', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
    //     // Add more data as needed
    // ];

    // const viewDetails = async (id) => {
    //     try {
    //         await axios.get(`${adminUrl}employee-details/${id}`).then((response) => {
    //             console.log('res: ', response);
    //             setEmployeeDetails(response.data.data);
    //         });
    //         setShowDetails(true);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US'); // Change 'en-US' to your preferred locale if needed
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-start justify-center h-screen">
                    <div className="flex flex-col max-h-screen mx-8">
                        <div className="my-8">
                            <h1 className="text-3xl font-bold text-center">Leave Forms</h1>
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
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Reason</th>
                                    <th className="px-4 py-2 border">Action</th>
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
                                        <td className="px-4 py-2 border">{formatDate(item.date)}</td>
                                        <td className="px-4 py-2 border">{item.reason}</td>
                                        <td className="px-4 py-2 border">
                                            <button className='px-3 py-1 text-white bg-green-500 rounded hover:bg-green-700'>Approve</button>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className='px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700'>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    );
}

export default LeaveForms;
