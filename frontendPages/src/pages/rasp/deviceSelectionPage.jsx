import React, { useState } from 'react';

const DeviceSelectionPage = () => {
  // Sample initial devices data
  const [devices, setDevices] = useState([
    { id: 1, name: "Device 1", x: 150, y: 100, busy: false },
    { id: 2, name: "Device 2", x: 300, y: 200, busy: true },
    { id: 3, name: "Device 3", x: 700, y: 150, busy: false },
    { id: 4, name: "Device 4", x: 450, y: 300, busy: false },
    { id: 5, name: "Device 5", x: 600, y: 100, busy: true },
  ]);

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [error, setError] = useState('');

  const MAX_X = 900;
  const MAX_Y = 400;

  // Handle device selection/deselection
  const toggleDeviceSelection = (device) => {
    if (device.busy) {
      setError(`${device.name} is busy and cannot be selected`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    setSelectedDevices(prev => {
      const isSelected = prev.some(d => d.id === device.id);
      if (isSelected) {
        return prev.filter(d => d.id !== device.id);
      } else {
        return [...prev, device];
      }
    });
  };

  // Handle submission of selected devices
  const handleSubmit = () => {
    if (selectedDevices.length === 0) {
      setError('Please select at least one device');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // In a real app, you would send this data to your backend
    console.log('Submitting selected devices:', selectedDevices);
    alert(`Selected devices submitted: ${selectedDevices.map(d => d.name).join(', ')}`);
    
    // Reset selection after submission
    setSelectedDevices([]);
  };

  // Check if a device is currently selected
  const isDeviceSelected = (deviceId) => {
    return selectedDevices.some(device => device.id === deviceId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Device Selection Tool</h1>
      
      {/* Selection header */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-3 gap-4 w-3/4">
            <div>
              <label className="block mb-1 font-medium">Available Devices</label>
              <div className="bg-green-100 p-2 rounded flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Click to select</span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Busy Devices</label>
              <div className="bg-red-100 p-2 rounded flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Not selectable</span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Selected</label>
              <div className="bg-blue-100 p-2 rounded flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Click to Unselect</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            Submit Selection
          </button>
        </div>
        
        {error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}
      </div>
      
      {/* Map area */}
      <div className="border border-gray-200 rounded-lg mb-6">
        <div
          className="w-full h-96 relative cursor-pointer bg-white"
          style={{ borderRadius: '0.5rem' }}
        >
          {/* Display all devices */}
          {devices.map((device) => (
            <div
              key={device.id}
              className="absolute"
              style={{ 
                left: `${(device.x / MAX_X) * 100}%`, 
                top: `${(device.y / MAX_Y) * 100}%` 
              }}
              onClick={() => toggleDeviceSelection(device)}
            >
              <div 
                className={`w-3 h-3 rounded-full -ml-1.5 -mt-1.5 ${
                  device.busy 
                    ? 'bg-red-500' 
                    : isDeviceSelected(device.id)
                      ? 'bg-blue-500' 
                      : 'bg-green-500'
                }`}
              />
              <div className="absolute left-2 text-xs font-medium">
                {device.name}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500 p-2 border-t">
          <div>Click on the map to select/unselect devices</div>
          <div>Map dimensions: {MAX_X} × {MAX_Y}</div>
        </div>
      </div>
      
      {/* Device list */}
      <div>
        <h2 className="text-xl font-bold mb-3">Device List</h2>
        
        {devices.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">X Coordinate</th>
                <th className="p-3 text-left font-medium">Y Coordinate</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} className="border-b">
                  <td className="p-3">{device.name}</td>
                  <td className="p-3">{device.x}</td>
                  <td className="p-3">{device.y}</td>
                  <td className="p-3">
                    <span className={`inline-block rounded-full w-2 h-2 mr-2 ${device.busy ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    {device.busy ? "Busy" : "Available"}
                  </td>
                  <td className="p-3">
                    {device.busy ? (
                      <span className="text-gray-400">Unavailable</span>
                    ) : (
                      <button
                        onClick={() => toggleDeviceSelection(device)}
                        className={`px-3 py-1 rounded ${
                          isDeviceSelected(device.id)
                            ? "bg-gray-200 hover:bg-gray-300" 
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {isDeviceSelected(device.id) ? "Unselect" : "Select"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">No devices available</div>
        )}
        
        {/* Selected devices summary */}
        {selectedDevices.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Selected Devices: {selectedDevices.length}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedDevices.map(device => (
                <div key={device.id} className="bg-white border border-blue-200 rounded-lg px-3 py-1 text-sm flex items-center">
                  {device.name}
                  <button 
                    onClick={() => toggleDeviceSelection(device)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceSelectionPage;