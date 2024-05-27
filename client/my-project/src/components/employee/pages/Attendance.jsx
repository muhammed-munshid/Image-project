
function Attendance() {
    // Example data
    const data = [
        { id: 1, date: '2024-05-27', name: 'John Doe', workingTime: '08:00:00', breakTime: '01:00:00' },
        { id: 2, date: '2024-05-26', name: 'Jane Smith', workingTime: '07:30:00', breakTime: '00:45:00' },
        { id: 3, date: '2024-05-25', name: 'Alice Johnson', workingTime: '09:00:00', breakTime: '01:15:00' },
        // Add more data as needed
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Attendance Table</h1>
            <table className="table-auto bg-white rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">SI No</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Working Time</th>
                        <th className="px-4 py-2 border">Break Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{item.date}</td>
                            <td className="px-4 py-2 border">{item.name}</td>
                            <td className="px-4 py-2 border">{item.workingTime}</td>
                            <td className="px-4 py-2 border">{item.breakTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Attendance;
