import React from 'react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

const ExperimentDashboard = () => {
  const experiments = [
    {
      id: "223181",
      name: "demo1",
      date: "2020-07-06 15:24",
      duration: "20 minutes (0%)",
      nodes: 2,
      state: "Running"
    },
    {
      id: "223172",
      name: "demo2",
      date: "2020-07-06 15:20",
      duration: "1 minute",
      nodes: 2,
      state: "Stopped"
    },
    {
      id: "223165",
      name: "demo3",
      date: "2020-07-06 15:12",
      duration: "1 minute",
      nodes: 2,
      state: "Stopped"
    },
    {
      id: "223164",
      name: "demo4",
      date: "2020-07-06 15:09",
      duration: "20 minutes",
      nodes: 2,
      state: "Stopped"
    },
    {
      id: "223156",
      name: "demo5",
      date: "2020-07-06 15:01",
      duration: "2 minutes",
      nodes: 2,
      state: "Terminated"
    },
    {
      id: "195346",
      name: "demo6",
      date: "2020-03-10 14:46",
      duration: "2 minutes",
      nodes: 91,
      state: "Terminated"
    }
  ];

  const getStateStyle = (state) => {
    switch (state) {
      case 'Running':
        return 'bg-green-500 text-white';
      case 'Stopped':
        return 'bg-gray-700 text-white';
      case 'Terminated':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Running (0)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <span>Scheduled (1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <span>Completed (45)</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-gray-600 mb-4">Scheduled</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Id</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nodes</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {experiments.slice(0, 1).map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-blue-500">{exp.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{exp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.nodes}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStateStyle(exp.state)}`}>
                      {exp.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Link to='/newexp'>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                New experiment
            </Button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl text-gray-600 mb-4">Recent</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Id</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nodes</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {experiments.slice(1).map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <Link to='/logs'>
                    <td className="px-6 py-4 text-sm text-blue-500">{exp.id}</td>
                </Link>

                  <td className="px-6 py-4 text-sm text-gray-900">{exp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{exp.nodes}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStateStyle(exp.state)}`}>
                      {exp.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 text-blue-500 hover:text-blue-600">Load more...</button>
      </div>
    </div>
  );
};

export default ExperimentDashboard;