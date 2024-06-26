import axios from 'axios';
import { useState, useEffect } from 'react';
import { employeeUrl } from '../../../API/api';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
function Dashboard({ showList, handleGoBack, handleViewList }) {
    const [isWorking, setIsWorking] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [totalTime, setTotalTime] = useState(0); // Total elapsed time
    const [workTime, setWorkTime] = useState(0); // Total working time excluding breaks
    const [breakTime, setBreakTime] = useState(0); // Total break time in seconds
    const [attendanceList, setAttendenceList] = useState([])

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

    useEffect(() => {
        const showTable = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${employeeUrl}get-list`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('res:', response.data);
                setAttendenceList(response.data.attendance)
            } catch (error) {
                // toast.error('Something went wrong');
            }
        }
        showTable()
    }, [showList]);

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

    function convertToTimeFormat(seconds) {
        let hh = Math.floor(seconds / 3600);
        let mm = Math.floor((seconds % 3600) / 60);
        let ss = seconds % 60;
    
        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US'); // Change 'en-US' to your preferred locale if needed
    };

    const sendWorkData = async () => {
        const workData = {
            totalTime: convertToTimeFormat(totalTime),
            totalWorkTime: convertToTimeFormat(workTime),
            totalBreakTime: convertToTimeFormat(breakTime)
        };
        console.log(workData);
        // Send workData to the backend using fetch or axios
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${employeeUrl}dashboard`, workData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // const data = [
    //     { id: 1, date: '2024-05-27', totalTime: '08:00:00', workingTime: '08:00:00', breakTime: '01:00:00' },
    //     { id: 2, date: '2024-05-26', totalTime: '08:00:00', workingTime: '07:30:00', breakTime: '00:45:00' },
    //     { id: 3, date: '2024-05-25', totalTime: '08:00:00', workingTime: '09:00:00', breakTime: '01:15:00' },
    //     // Add more data as needed
    // ];

    return (
        <div>
            {!isWorking && !showList ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={startWork}
                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Start Work
                        </button>
                        <button
                            onClick={handleViewList}
                            className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Attendance List
                        </button>
                    </div>
                </div>
            ) : showList ? (
                <div className="flex items-start justify-center h-screen">
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
                                    <th className="px-4 py-2 border">Total Time</th>
                                    <th className="px-4 py-2 border">Break Time</th>
                                    <th className="px-4 py-2 border">Working Time</th>
                                    <th className="px-4 py-2 border">P/L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceList.map((item, index) => (
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
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
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
                </div>
            )}
        </div>
    );
}

export default Dashboard;
