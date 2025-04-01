import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const LogsPage = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState('RaspberryPi-Kitchen');
  const [logLevel, setLogLevel] = useState('info');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample connected devices
  const devices = [
    { id: 1, name: 'Node1_c13', status: 'online', batteryLevel: 34, onlineTime: '5hr 27min' },
    { id: 2, name: 'Node2_c14', status: 'online', batteryLevel: 89, onlineTime: '2hr 43min' },
    { id: 3, name: 'Node_alpha', status: 'offline', batteryLevel: 0, onlineTime: '0hr 0min' }
  ];
  
  // Sample logs data
  const logs = [
    { id: 1, timestamp: '2025-03-18 09:45:23', level: 'info', message: 'System startup completed successfully', source: 'system' },
    { id: 2, timestamp: '2025-03-18 09:46:12', level: 'info', message: 'Connected to network: Home-WiFi', source: 'network' },
    { id: 3, timestamp: '2025-03-18 10:01:38', level: 'warning', message: 'CPU temperature threshold approaching (72°C)', source: 'hardware' },
    { id: 4, timestamp: '2025-03-18 10:12:45', level: 'error', message: 'Failed to execute scheduled task: BackupData', source: 'scheduler' },
    { id: 5, timestamp: '2025-03-18 10:30:17', level: 'info', message: 'New device detected on network: SmartTV-Living', source: 'network' },
    { id: 6, timestamp: '2025-03-18 10:45:03', level: 'critical', message: 'Low battery warning (34%)', source: 'power' },
    { id: 7, timestamp: '2025-03-18 11:02:30', level: 'info', message: 'Update check completed - System up to date', source: 'updater' },
    { id: 8, timestamp: '2025-03-18 11:15:09', level: 'info', message: 'Job started: PureCode.c execution', source: 'jobs' },
    { id: 9, timestamp: '2025-03-18 11:42:19', level: 'info', message: 'Job completed: PureCode.c execution (Duration: 27mins)', source: 'jobs' },
  ];

  // Filter logs based on selected level and search term
  const filteredLogs = logs.filter(log => {
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  // Simulate auto-refresh
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log("Auto-refreshing logs...");
        // In a real app, you would fetch new logs here
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getLogLevelColor = (level) => {
    switch(level) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportLogs = () => {
    console.log('Exporting logs...');
    // Implement log export functionality
  };

  const handleClearLogs = () => {
    console.log('Clearing logs...');
    // Implement log clearing functionality
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
              </Link>
              <Link to={'/files'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="font-medium">Files</span>
              </Link>
              <Link to={'/ilog'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-100 text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Logs</span>
              </Link>
              <Link to={'/devices'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="font-medium">Devices</span>
              </Link>
            </nav>
            <div className="mt-8">
              <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-2 bg-green-500"></div>
                  <span className="text-sm font-medium">Connected</span>
                </div>
                <p className="text-xs mt-1">Device: {selectedDevice}</p>
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
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Raspberry Pi</h2>
                <p className="text-gray-600">System Logs & Diagnostics</p>
              </div>
              
              {/* Device Status Cards */}
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="bg-white rounded-lg shadow-sm p-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Battery</p>
                    <p className="font-medium text-gray-800">34%</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Online time</p>
                    <p className="font-medium text-gray-800">5hr 27min</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Logs Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Device Selector */}
                  <div>
                    <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1">Device</label>
                    <select
                      id="device"
                      value={selectedDevice}
                      onChange={(e) => setSelectedDevice(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {devices.map((device) => (
                        <option key={device.id} value={device.name}>{device.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Log Level Filter */}
                  <div>
                    <label htmlFor="logLevel" className="block text-sm font-medium text-gray-700 mb-1">Log Level</label>
                    <select
                      id="logLevel"
                      value={logLevel}
                      onChange={(e) => setLogLevel(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="all">All Levels</option>
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Search Bar */}
                  <div className="relative flex-grow max-w-sm">
                    <input
                      type="text"
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Auto-refresh Toggle */}
                  <label htmlFor="autoRefresh" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="autoRefresh" 
                        className="sr-only" 
                        checked={autoRefresh}
                        onChange={() => setAutoRefresh(!autoRefresh)}
                      />
                      <div className={`block w-10 h-6 rounded-full ${autoRefresh ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${autoRefresh ? 'translate-x-4' : ''}`}></div>
                    </div>
                    <div className="ml-2 text-sm text-gray-700">Auto-refresh</div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Logs Display */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">System Logs</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleExportLogs}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                  >
                    Export
                  </button>
                  <button 
                    onClick={handleClearLogs}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLogLevelColor(log.level)}`}>
                              {log.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.source}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No logs matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Connected Devices Overview */}
              <div className="p-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Connected Devices</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {devices.map((device) => (
                    <div key={device.id} className={`p-3 rounded-lg border ${device.status === 'online' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-2 ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-sm font-medium text-gray-800">{device.name}</span>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-600">
                        <span>Battery: {device.batteryLevel}%</span>
                        <span>Online: {device.onlineTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export default LogsPage;