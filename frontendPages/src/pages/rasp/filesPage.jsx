import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const FilesPage = () => {
  const [isConnected, setIsConnected] = useState(true);
  
  // Sample files data
  const files = [
    { id: 1, name: 'MyProjectFile.c', uploadedBy: 'Jonh Matthew', date: '2025-03-15' },
    { id: 2, name: 'MyProjectFile.c', uploadedBy: 'Jonh Matthew', date: '2025-03-14' },
    { id: 3, name: 'MyProjectFile.c', uploadedBy: 'Jonh Matthew', date: '2025-03-13' },
  ];

  const handleOpenFile = (fileId) => {
    console.log(`Opening file with ID: ${fileId}`);
    // Implement file opening logic here
  };

  const handleInspectFile = (fileId) => {
    console.log(`Inspecting file with ID: ${fileId}`);
    // Implement file inspection logic here
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="bg-gray-50 w-64 border-r border-gray-200 hidden md:block">
          <div className="p-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">IOT RPR</h1>
              <div className="h-1 w-12 bg-blue-600 rounded"></div>
            </div>
            <nav className="space-y-1">
              <Link to={'/rpr'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium">Connect</span>
              {/* </button> */}
            </Link>
              <Link to={'/files'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-100 text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="font-medium">Files</span>
              {/* </button> */}
            </Link>
              {/* <Link to={'/ilog'} key={logs}> */}
              < Link to={'/ilog'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Logs</span>
              {/* </button> */}
            </Link>
              <Link to={'/devices'} 
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="font-medium">Devices</span>
              {/* </button> */}
            </Link>
            </nav>
            <div className="mt-8">
              <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-2 bg-green-500"></div>
                  <span className="text-sm font-medium">Connected</span>
                </div>
                <p className="text-xs mt-1">Device: RaspberryPi-Kitchen</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">IOT RPR</h1>
          <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="p-4 md:p-8 flex-1">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Raspberry Pi</h2>
              <p className="text-gray-600">IoT Remote Provisioning & Reporting</p>
            </div>
            
            {/* Files Page Content */}
            <div className="space-y-4">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-800">{file.name}</h3>
                    <p className="text-sm text-gray-600">Uploaded By: {file.uploadedBy}</p>
                  </div>
                  
                  <div className="flex space-x-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleOpenFile(file.id)}
                      className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Open
                    </button>
                    <button 
                      onClick={() => handleInspectFile(file.id)}
                      className="flex-1 md:flex-none px-4 py-2 rounded-md bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} IoT RPR for Raspberry Pi | v1.0.0
          </footer>
        </div>
      </div>
    </div>
  );
};

export default FilesPage;