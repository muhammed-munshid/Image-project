import { Link } from "react-router-dom";
import Navbar from "../Navbar";

// eslint-disable-next-line react/prop-types
function Details() {

    const data = [
        { id: 1, date: '2024-05-27', totalTime: '08:00:00', workingTime: '08:00:00', breakTime: '01:00:00' },
        { id: 2, date: '2024-05-26', totalTime: '08:00:00', workingTime: '07:30:00', breakTime: '00:45:00' },
        { id: 3, date: '2024-05-25', totalTime: '08:00:00', workingTime: '09:00:00', breakTime: '01:15:00' },
        // Add more data as needed
    ];

    return (
        <div>
            <Navbar />
            <div className="flex items-start justify-center h-screen">
                <div className="flex flex-col max-h-screen">
                    <div className="flex flex-row justify-between items-center my-8">
                        <h1 className="text-3xl font-bold">Details of Name</h1>
                        <Link to='/admin-dashboard' className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                            Go Back
                        </Link>
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
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{item.date}</td>
                                    <td className="px-4 py-2 border">{item.totalTime}</td>
                                    <td className="px-4 py-2 border">{item.breakTime}</td>
                                    <td className="px-4 py-2 border">{item.workingTime}</td>
                                    <td className="px-4 py-2 border">
                                        <button className='px-3 py-1 text-white bg-green-500 rounded hover:bg-green-700'>Present</button>
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

export default Details;
