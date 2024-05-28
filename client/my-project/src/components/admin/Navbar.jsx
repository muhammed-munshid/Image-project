import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <nav className="bg-red-600 p-3 flex justify-between items-center sticky top-0 h-16">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleSidebar} className="text-white bg-red-700 p-2 rounded-full hover:bg-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <img src="/image.jpeg" className="h-full ml-5" width={80} alt="" />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-white bg-red-700 p-2 rounded-full hover:bg-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-2-2v0a2 2 0 00-2 2v.083A6 6 0 005 11v3.159c0 .538-.214 1.054-.595 1.436L3 17h5m4 0v2a2 2 0 11-4 0v-2m4 0H7" />
                        </svg>
                    </button>
                    <Link to='/admin' className="text-white bg-red-700 px-4 py-2 rounded hover:bg-red-800">Logout</Link>
                </div>
            </nav>
            {sidebarOpen && (
                <div className="fixed inset-0 z-40">
                    <div className="fixed left-0 h-full w-64 bg-slate-200 p-4" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4 text-black">Menu</h2>
                        <ul>
                            <li className="mb-2">
                                <Link to='/admin-dashboard' className="text-left w-full text-gray-800">Employees List</Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/leave-forms' className="text-left w-full text-gray-800">Leave forms</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
                </div>
            )}
        </>
    );
}

export default Navbar;
