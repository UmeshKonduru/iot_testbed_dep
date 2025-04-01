import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const IoTRPRInterface = () => {
  const [deviceName, setDeviceName] = useState('');
  const [token, setToken] = useState('');
  const [selectedTab, setSelectedTab] = useState('connect');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');

  const handleConnect = () => {
    if (!deviceName || !token) {
      setConnectionStatus('Please enter both device name and token');
      return;
    }
    
    setConnectionStatus('Connecting...');
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus(`Connected to ${deviceName} successfully!`);
    }, 1500);
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
              <button
                onClick={() => setSelectedTab('connect')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'connect' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium">Connect</span>
              </button>
              <Link to={'/files'}
                onClick={() => setSelectedTab('files')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'files' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="font-medium">Files</span>
              </Link>
              <Link to={'/ilog'}
                onClick={() => setSelectedTab('logs')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'logs' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Logs</span>
              </Link>
              <Link to={'/devices'}
                onClick={() => setSelectedTab('devices')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  selectedTab === 'devices' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="font-medium">Devices</span>
              </Link>
            </nav>
            <div className="mt-8">
              <div className={`px-4 py-2 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
                {isConnected && <p className="text-xs mt-1">Device: {deviceName}</p>}
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
            
            {/* Connect Page Content */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-center">Connect to Server</h2>
              {!isConnected ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="deviceName" className="block text-gray-700 mb-1">Enter Device Name</label>
                      <input
                        id="deviceName"
                        type="text"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., RaspberryPi-B1a"
                      />
                    </div>
                    <div>
                      <label htmlFor="token" className="block text-gray-700 mb-1">Enter Token</label>
                      <input
                        id="token"
                        type="password"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter security token"
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleConnect}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-transform duration-200 hover:scale-105"
                      >
                        Connect
                      </button>
                      {connectionStatus && (
                        <p className={`mt-3 text-sm ${connectionStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                          {connectionStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-4 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xl font-medium text-gray-800">{connectionStatus}</p>
                  <button
                    onClick={() => {
                      setIsConnected(false);
                      setConnectionStatus('');
                    }}
                    className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                  >
                    Disconnect
                  </button>
                </div>
              )}
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

export default IoTRPRInterface;