import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Clock, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewExperiment = () => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedTab, setSelectedTab] = useState('node properties');
  
  const tabs = ['Node Names'];
  
  const addNode = () => {
    const newNode = {
      id: `m3-${Math.floor(Math.random() * 1000)}`,
      location: 'Lille',
      architecture: 'M3 (At86rf231)',
      program: 'leds_chaser.elf'
    };
    setSelectedNodes([...selectedNodes, newNode]);
  };
  
  const removeNode = (nodeId) => {
    setSelectedNodes(selectedNodes.filter(node => node.id !== nodeId));
  };
  
  const clearAll = () => {
    setSelectedNodes([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Schedule Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="text-gray-500" size={20} />
            <span className="text-gray-700">Schedule</span>
          </div>
          <span className="text-gray-500">20 min, as soon as possible</span>
        </div>
      </div>

      {/* Nodes Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Server className="text-gray-500" size={20} />
              <span className="text-gray-700">Nodes</span>
            </div>
            <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
              {selectedNodes.length}
            </span>
          </div>
        </div>

        {/* Selection Tabs */}
        <div className="border-b">
          <div className="flex gap-4 p-4">
            <span className="text-gray-500">Select by</span>
            {tabs.map(tab => (
              <button
                key={tab}
                className={`text-sm ${selectedTab === tab ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Node Selection Form */}
        <div className="p-4">
          <p className="text-gray-700 mb-4">Select a site, architecture and desired ids.</p>
          <div className="flex gap-4 mb-4">
            <select className="p-2 border rounded-md bg-gray-50 text-gray-700">
              <option>Lille</option>
              <option>Paris</option>
              <option>Grenoble</option>
            </select>
            <select className="p-2 border rounded-md bg-gray-50 text-gray-700">
              <option>M3 (At86rf231)</option>
              <option>A8 (At86rf231)</option>
            </select>
            <input
              type="text"
              placeholder="156+157"
              className="p-2 border rounded-md"
            />
            <Button 
              onClick={addNode}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              + Add to experiment
            </Button>
          </div>
        </div>

        {/* Selected Nodes */}
        {selectedNodes.length > 0 && (
          <div className="bg-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-700">{selectedNodes.length} nodes selected:</span>
              <button 
                className="text-blue-500 text-sm hover:underline"
                onClick={clearAll}
              >
                clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-md"
                >
                  <span>{node.id}</span>
                  <button
                    onClick={() => removeNode(node.id)}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl text-gray-700 mb-4">Summary</h2>
        <p className="text-gray-600 mb-6">
          Your experiment on {selectedNodes.length} nodes is set to start{' '}
          <span className="text-blue-500">as soon as possible</span> for{' '}
          <span className="text-blue-500">20 minutes</span>.
        </p>
        <Link to='/dashboard'>
            <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
            >
                Submit experiment
            </Button>
        </Link>


      </div>
    </div>
  );
};

export default NewExperiment;