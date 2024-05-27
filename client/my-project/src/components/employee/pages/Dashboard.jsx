import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Dashboard({ showList, handleGoBack }) {
    const [isWorking, setIsWorking] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [totalTime, setTotalTime] = useState(0); // Total elapsed time
    const [workTime, setWorkTime] = useState(0); // Total working time excluding breaks
    const [breakTime, setBreakTime] = useState(0); // Total break time in seconds

    useEffect(() => {
        let interval;
        if (isWorking) {
            interval = setInterval(() => {
                setTotalTime((prevTime) => prevTime + 1);
                if (!onBreak) {
                    setWorkTime((prevWorkTime) => prevWorkTime + 1);
                } else {
                    setBreakTime((prevBreakTime) => prevBreakTime + 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isWorking, onBreak]);

    const startWork = () => {
        setIsWorking(true);
        setOnBreak(false);
        setBreakTime(0); // Reset break time
    };

    const takeBreak = () => {
        setOnBreak(true);
    };

    const resumeWork = () => {
        setOnBreak(false);
    };

    const endWork = () => {
        setIsWorking(false);
        setOnBreak(false);
        setTotalTime(0);
        setWorkTime(0);
        setBreakTime(0);
        // Here you would send the data to the backend
        sendWorkData();
    };

    const sendWorkData = () => {
        const workData = {
            totalTime: totalTime,
            totalWorkTime: workTime,
            totalBreakTime: breakTime
        };
        console.log(workData);
        // Send workData to the backend using fetch or axios
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const data = [
        { id: 1, date: '2024-05-27', name: 'John Doe', workingTime: '08:00:00', breakTime: '01:00:00' },
        { id: 2, date: '2024-05-26', name: 'Jane Smith', workingTime: '07:30:00', breakTime: '00:45:00' },
        { id: 3, date: '2024-05-25', name: 'Alice Johnson', workingTime: '09:00:00', breakTime: '01:15:00' },
        // Add more data as needed
    ];

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                {!isWorking && !showList ? (
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={startWork}
                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Start Work
                        </button>
                        <button
                            onClick={handleGoBack}
                            className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Attendance List
                        </button>
                    </div>
                ) : showList ? (
                    <div className="flex flex-col max-h-screen">
                        <div className="flex flex-row justify-between items-center my-8">
                            <h1 className="text-3xl font-bold">Attendance Table</h1>
                            <button onClick={handleGoBack} className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Go Back
                            </button>
                        </div>
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
                ) : (
                    <div className="bg-yellow-400 p-20 rounded-lg text-center">
                        <div className="mb-4 text-2xl font-bold">TIMER</div>
                        <div className="mb-4 text-4xl font-bold">{formatTime(totalTime)}</div>
                        <div className="mb-4 text-xl font-bold">Work Time: {formatTime(workTime)}</div>
                        {onBreak && <div className="mb-4 text-xl font-bold text-red-500">On Break</div>}
                        <div className="flex justify-center space-x-4 mb-4">
                            {onBreak ? (
                                <button onClick={resumeWork} className="px-4 py-2 bg-gray-300 rounded">Resume Work</button>
                            ) : (
                                <button onClick={takeBreak} className="px-4 py-2 bg-gray-300 rounded">Take a Break</button>
                            )}
                        </div>
                        <button
                            onClick={endWork}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                        >
                            End Work
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
