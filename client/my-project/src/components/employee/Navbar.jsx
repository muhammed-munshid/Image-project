// import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Navbar({ toggleSidebar, sidebarOpen, handleViewList }) {
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
                    <button className="text-white bg-red-700 px-4 py-2 rounded hover:bg-red-800">Apply for Leave</button>
                    <button className="text-white bg-red-700 p-2 rounded-full hover:bg-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-2-2v0a2 2 0 00-2 2v.083A6 6 0 005 11v3.159c0 .538-.214 1.054-.595 1.436L3 17h5m4 0v2a2 2 0 11-4 0v-2m4 0H7" />
                        </svg>
                    </button>
                    <button className="text-white bg-red-700 px-4 py-2 rounded hover:bg-red-800">Logout</button>
                </div>
            </nav>
            {sidebarOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40" onClick={toggleSidebar}>
                    <div className={`fixed top-0 left-0 h-full w-64 bg-white p-4 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4">Menu</h2>
                        <ul>
                            <li className="mb-2">
                                <button onClick={handleViewList} className="text-left w-full text-gray-800">Attendance List</button>
                            </li>
                            <li className="mb-2">
                                <button className="text-left w-full text-gray-800">Apply for Leave</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
