import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const DevicesPage = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('raspberry-pi');
  const [deviceIP, setDeviceIP] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPairingModal, setShowPairingModal] = useState(false);
  
  // Sample devices data
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      name: 'Node1-C13', 
      type: 'raspberry-pi', 
      status: 'online', 
      ip: '192.168.1.101', 
      lastSeen: 'Now', 
      batteryLevel: 34,
      temperature: 42.5,
      storage: { total: 32, used: 18.7 }
    },
    { 
      id: 2, 
      name: 'Node2-C14', 
      type: 'raspberry-pi', 
      status: 'online', 
      ip: '192.168.1.102', 
      lastSeen: '2 mins ago', 
      batteryLevel: 89,
      temperature: 38.2,
      storage: { total: 16, used: 9.3 }
    },
    { 
      id: 3, 
      name: 'Node_alpha', 
      type: 'raspberry-pi', 
      status: 'offline', 
      ip: '192.168.1.103', 
      lastSeen: '3 hours ago', 
      batteryLevel: 0,
      temperature: 0,
      storage: { total: 32, used: 14.5 }
    },
  ]);

  // Filter devices based on search term
  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDevice = () => {
    if (deviceName && deviceIP) {
      const newDevice = {
        id: devices.length + 1,
        name: deviceName,
        type: deviceType,
        status: 'offline',
        ip: deviceIP,
        lastSeen: 'Never',
        batteryLevel: 0,
        temperature: 0,
        storage: { total: 32, used: 0 }
      };
      
      setDevices([...devices, newDevice]);
      setDeviceName('');
      setDeviceIP('');
      setShowPairingModal(true);
    }
  };

  const handleRemoveDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const getDeviceIcon = (type, status) => {
    if (type === 'raspberry-pi') {
      return (
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${status === 'online' ? 'text-green-600' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 7v2"></path>
            <path d="M12 15v2"></path>
            <path d="M7 12h2"></path>
            <path d="M15 12h2"></path>
          </svg>
        </div>
      );
    }
    return null;
  };

  const getDeviceStats = (device) => {
    const batteryColor = device.batteryLevel > 70 ? 'text-green-600' : device.batteryLevel > 30 ? 'text-yellow-600' : 'text-red-600';
    const storagePercent = Math.round((device.storage.used / device.storage.total) * 100);
    const storageColor = storagePercent > 80 ? 'bg-red-600' : storagePercent > 60 ? 'bg-yellow-600' : 'bg-green-600';
    
    return (
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Battery</div>
          <div className={`font-medium ${batteryColor}`}>{device.status === 'online' ? `${device.batteryLevel}%` : 'N/A'}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Temp</div>
          <div className="font-medium">{device.status === 'online' ? `${device.temperature}°C` : 'N/A'}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500">Storage</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div className={`h-2.5 rounded-full ${storageColor}`} style={{ width: `${storagePercent}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  const PairingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Pairing Device</h3>
        <div className="mb-6">
          <div className="flex flex-col items-center">
            <div className="animate-pulse mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-center text-gray-600">Please follow these steps to pair your device:</p>
            <ol className="list-decimal list-inside mt-4 text-gray-700">
              <li className="mb-2">Connect your Raspberry Pi to power</li>
              <li className="mb-2">Ensure it's connected to the same network</li>
              <li className="mb-2">Install the IoT RPR client on your device</li>
              <li>Run the pairing command: <code className="bg-gray-100 px-2 py-1 rounded">rpr-client --pair</code></li>
            </ol>
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={() => setShowPairingModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

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
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Logs</span>
              </Link>
              <Link to={'/devices'}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-100 text-blue-700"
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
              <p className="text-gray-600">Device Management & Configuration</p>
            </div>
            
            {/* Search and Add Device */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Add Device</h3>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
                  <input
                    id="deviceName"
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="e.g. Node23_ck3"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                  <select
                    id="deviceType"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="raspberry-pi">NRF24L01</option>
                    <option value="arduino">Arduino</option>
                    <option value="esp32">ESP32</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="deviceIP" className="block text-sm font-medium text-gray-700 mb-1">Connection Token</label>
                  <input
                    id="deviceIP"
                    type="text"
                    value={deviceIP}
                    onChange={(e) => setDeviceIP(e.target.value)}
                    placeholder="e.g. 3d4f5g6h7j8k9l0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddDevice}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full md:w-auto"
                  >
                    Add Device
                  </button>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* My Devices */}
            <div>
              <h3 className="text-xl font-semibold mb-4">My Devices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevices.map((device) => (
                  <div key={device.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center">
                        {getDeviceIcon(device.type, device.status)}
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-gray-800">{device.name}</h4>
                          <div className="flex items-center mt-1">
                            <div className={`h-2 w-2 rounded-full mr-2 ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">
                              {device.status === 'online' ? 'Online' : 'Offline'} • {device.lastSeen}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{device.ip}</p>
                        </div>
                      </div>
                      
                      {getDeviceStats(device)}
                      
                      <div className="mt-4 flex justify-end">
                        <button 
                          onClick={() => handleRemoveDevice(device.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredDevices.length === 0 && (
                  <div className="col-span-full bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600">No devices found</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} IoT RPR for Raspberry Pi | v1.0.0
          </footer>
        </div>
      </div>
      
      {/* Pairing Modal */}
      {showPairingModal && <PairingModal />}
    </div>
  );
};

export default DevicesPage;