import Navbar from '../Navbar';

// eslint-disable-next-line react/prop-types
function AdminDashboard() {

    const data = [
        { id: 1, name: 'John Doe', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
        { id: 2, name: 'Jane Smith', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
        { id: 3, name: 'Alice Johnson', phone: '9072065394', email: 'muhammadmunshid200@gmail.com' },
        // Add more data as needed
    ];

    return (
        <div>
            <Navbar />
            <div className="flex items-start justify-center h-screen">
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
                                        <button className='px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700'>View</button>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button className='px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700'>Block</button>
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

export default AdminDashboard;
