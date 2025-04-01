import React, { useState, useRef } from 'react';

const DeviceMapper = () => {
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [xCoord, setXCoord] = useState('');
  const [yCoord, setYCoord] = useState('');
  const [error, setError] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const mapRef = useRef(null);

  const MAX_X = 900;
  const MAX_Y = 400;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!deviceName.trim()) {
      setError('Device name is required');
      return;
    }
    
    const x = parseInt(xCoord);
    const y = parseInt(yCoord);
    
    if (isNaN(x) || isNaN(y)) {
      setError('Coordinates must be numbers');
      return;
    }
    
    if (x < 0 || x > MAX_X || y < 0 || y > MAX_Y) {
      setError(`Coordinates must be within range: 0-${MAX_X} for X and 0-${MAX_Y} for Y`);
      return;
    }
    
    // Check for duplicate device names
    if (devices.some(device => device.name === deviceName)) {
      setError('Device name must be unique');
      return;
    }
    
    // Add new device
    const newDevice = {
      id: Date.now(),
      name: deviceName,
      x,
      y
    };
    
    setDevices([...devices, newDevice]);
    
    // Reset form
    setDeviceName('');
    setXCoord('');
    setYCoord('');
    setError('');
  };
  
  const handleMapClick = (e) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (MAX_X / rect.width));
    const y = Math.round((e.clientY - rect.top) * (MAX_Y / rect.height));
    
    setXCoord(x);
    setYCoord(y);
  };
  
  const handleDeviceClick = (device) => {
    setSelectedDevice(device.id === selectedDevice ? null : device.id);
  };
  
  const handleDelete = (id) => {
    setDevices(devices.filter(device => device.id !== id));
    setSelectedDevice(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Device Mapping Tool</h1>
      
      {/* Form for adding devices */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Device Name</label>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter device name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">X Coordinate</label>
            <input
              type="number"
              value={xCoord}
              onChange={(e) => setXCoord(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0-900"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Y Coordinate</label>
            <input
              type="number"
              value={yCoord}
              onChange={(e) => setYCoord(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0-400"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Device
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </form>
      
      {/* Map area */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-96 border-2 border-gray-300 rounded-lg bg-white relative cursor-crosshair"
          onClick={handleMapClick}
        >
          {/* Display all devices */}
          {devices.map((device) => (
            <div key={device.id} className="absolute" style={{ 
              left: `${(device.x / MAX_X) * 100}%`, 
              top: `${(device.y / MAX_Y) * 100}%` 
            }}>
              <div 
                className={`w-3 h-3 bg-black rounded-full -ml-1.5 -mt-1.5 ${
                  selectedDevice === device.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeviceClick(device);
                }}
              />
              <div className="absolute left-2 text-xs font-medium">{device.name}</div>
              
              {selectedDevice === device.id && (
                <div className="absolute mt-2 -ml-8">
                  <button
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(device.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Map info */}
        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <div>Click on the map to set coordinates</div>
          <div>Map dimensions: {MAX_X} x {MAX_Y}</div>
        </div>
      </div>
      
      {/* Device list */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Device List</h2>
        {devices.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">X</th>
                <th className="border p-2 text-left">Y</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="border p-2">{device.name}</td>
                  <td className="border p-2">{device.x}</td>
                  <td className="border p-2">{device.y}</td>
                  <td className="border p-2">
                    <button
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">No devices added yet</div>
        )}
      </div>
    </div>
  );
};

export default DeviceMapper;