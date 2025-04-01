import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Filter, RefreshCw,Home, Terminal } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

const IoTLogsPage = () => {
  const [expandedNode, setExpandedNode] = useState('rpi-001');
  const [activeTab, setActiveTab] = useState('all');
  
  const logData = [
    {
      nodeId: 'rpi-001',
      name: 'Temperature Sensor Node',
      status: 'Online',
      lastUpdate: '2025-02-19 14:32:45',
      logs: [
        { time: '14:32:45', level: 'info', message: 'Temperature reading: 23.5°C' },
        { time: '14:30:00', level: 'info', message: 'Humidity reading: 45%' },
        { time: '14:25:12', level: 'warning', message: 'Battery level below 30%' },
        { time: '14:15:03', level: 'error', message: 'Failed to connect to gateway' },
        { time: '14:10:22', level: 'info', message: 'Reconnected to gateway successfully' },
      ]
    },
    {
      nodeId: 'rpi-002',
      name: 'Motion Detector',
      status: 'Online',
      lastUpdate: '2025-02-19 14:30:12',
      logs: [
        { time: '14:30:12', level: 'info', message: 'Motion detected in zone A' },
        { time: '14:15:45', level: 'info', message: 'No motion for past 15 minutes' },
        { time: '14:00:33', level: 'debug', message: 'Sensitivity adjusted to 85%' },
      ]
    },
    {
      nodeId: 'rpi-003',
      name: 'Gateway Node',
      status: 'Warning',
      lastUpdate: '2025-02-19 14:28:55',
      logs: [
        { time: '14:28:55', level: 'warning', message: 'High network traffic detected' },
        { time: '14:25:20', level: 'info', message: 'Forwarded 238 messages to cloud' },
        { time: '14:20:15', level: 'info', message: 'Received heartbeat from 5 nodes' },
        { time: '14:15:10', level: 'debug', message: 'Running network diagnostics' },
      ]
    },
    {
      nodeId: 'rpi-004',
      name: 'Environmental Monitor',
      status: 'Offline',
      lastUpdate: '2025-02-19 13:45:18',
      logs: [
        { time: '13:45:18', level: 'error', message: 'Device shutdown - power failure' },
        { time: '13:44:55', level: 'warning', message: 'Power supply unstable' },
        { time: '13:40:22', level: 'info', message: 'CO2 level: 412ppm' },
      ]
    },
  ];

  const toggleExpand = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return 'bg-green-500';
      case 'Warning': return 'bg-yellow-500';
      case 'Offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'debug': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filterLogs = (logs) => {
    if (activeTab === 'all') return logs;
    return logs.filter(log => log.level === activeTab);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-semibold text-gray-800">IoT Experiment Logs</h1>

<div className="flex gap-2">
<Button 
            className="bg-white text-gray-700 border hover:bg-gray-50"
            size="sm"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>

          <Link to='/dashboard'>
<Button 
            className="bg-white text-gray-700 border hover:bg-gray-50"
            size="sm"
          >
            <Home size={16} className="mr-2" />
            Home
          </Button>
            </Link>


        </div>

       </div>  

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-gray-500" />
            <h2 className="text-lg font-medium">Experiment Nodes</h2>
          </div>
        </div>

        <div className="p-4">
          <div className="grid gap-4">
            {logData.map((node) => (
              <div key={node.nodeId} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpand(node.nodeId)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(node.status)}`}></div>
                    <span className="font-medium">{node.name}</span>
                    <span className="text-sm text-gray-500">({node.nodeId})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Last update: {node.lastUpdate}</span>
                    {expandedNode === node.nodeId ? (
                      <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedNode === node.nodeId && (
                  <div className="p-4">
                    <div className="flex border-b mb-4">
                      <button
                        className={`px-4 py-2 text-sm ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('all')}
                      >
                        All Logs
                      </button>
                      <button
                        className={`px-4 py-2 text-sm ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('info')}
                      >
                        Info
                      </button>
                      <button
                        className={`px-4 py-2 text-sm ${activeTab === 'warning' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('warning')}
                      >
                        Warnings
                      </button>
                      <button
                        className={`px-4 py-2 text-sm ${activeTab === 'error' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('error')}
                      >
                        Errors
                      </button>
                      <button
                        className={`px-4 py-2 text-sm ${activeTab === 'debug' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('debug')}
                      >
                        Debug
                      </button>
                    </div>

                    <div className="space-y-2">
                      {filterLogs(node.logs).map((log, index) => (
                        <div key={index} className="flex p-2 border-b last:border-0">
                          <div className="w-24 text-sm text-gray-500">
                            {log.time}
                          </div>
                          <div className="w-24">
                            <span className={`px-2 py-1 rounded-md text-xs ${getLogLevelColor(log.level)}`}>
                              {log.level.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 text-sm">
                            {log.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-4">Experiment Summary</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-2xl font-semibold">2</div>
            <div className="text-sm text-gray-600">Online Nodes</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-yellow-600 text-2xl font-semibold">1</div>
            <div className="text-sm text-gray-600">Warning Status</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-red-600 text-2xl font-semibold">1</div>
            <div className="text-sm text-gray-600">Offline Nodes</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 text-2xl font-semibold">15</div>
            <div className="text-sm text-gray-600">Total Log Entries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTLogsPage;