import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  BookOpen, 
  Users, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Bell, 
  User, 
  UserPlus, 
  ListTodo, 
  ChevronRight 
} from 'lucide-react';
import image from '../../components/svgs/image.jpg';

// Top Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow p-4 flex items-center justify-between">
    <div className="flex items-center">
      <img 
        src={image} 
        alt="Logo" 
        className="w-10 h-10 rounded-full mr-3" 
      />
      <h1 className="text-2xl font-bold text-gray-800">EduAdmin</h1>
    </div>
    <div className="flex items-center space-x-4">
      <Link to="/admin">
        <BookOpen className="w-6 h-6 text-gray-600" />
      </Link>
      <div className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      </div>
    </div>
  </nav>
);

// Sidebar Component
const Sidebar = () => (
  <div className="w-64 bg-white shadow-xl p-6 border-r">
    <div className="flex items-center mb-10">
      <img 
        src={image}
        alt="Logo" 
        className="w-10 h-10 rounded-full mr-3"
      />
      <h1 className="text-2xl font-bold text-gray-800">EduAdmin</h1>
    </div>
    <nav className="space-y-2">
      {[
        { name: 'Dashboard', icon: <Book className="w-5 h-5" />, key: 'dashboard', link: '/admin' },
        { name: 'Courses', icon: <BookOpen className="w-5 h-5" />, key: 'courses', link: '/course' },
        { name: 'Students', icon: <Users className="w-5 h-5" />, key: 'students', link: '/students' },
        { name: 'Assignments', icon: <FileText className="w-5 h-5" />, key: 'assignments', link: '/assignments' }
      ].map((item) => (
        <Link to={item.link} key={item.key}>
          <button 
            className="w-full flex items-center p-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        </Link>
      ))}
    </nav>
  </div>
);

const initialAssignments = [
  {
    id: 1,
    title: 'Machine Learning Problem Set',
    course: 'Computer Science 301',
    description: 'Implement a neural network from scratch',
    dueDate: '2024-04-15',
    completionRate: 75,
    files: ['neural_network_template.py'],
    assignedTo: 'All Students'
  },
  {
    id: 2,
    title: 'Historical Analysis Essay',
    course: 'World History 201',
    description: 'Write a 5-page essay on industrial revolution',
    dueDate: '2024-04-22',
    completionRate: 45,
    files: ['essay_guidelines.docx'],
    assignedTo: 'Advanced History Section'
  },
  {
    id: 3,
    title: 'Database Design Project',
    course: 'Software Engineering 402',
    description: 'Create an E-R diagram for a university system',
    dueDate: '2024-05-01',
    completionRate: 60,
    files: ['project_requirements.pdf'],
    assignedTo: 'Senior Software Engineers'
  }
];

const AssignmentManagementPage = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    description: '',
    dueDate: '',
    files: []
  });

  const handleCreateAssignment = () => {
    const assignmentToAdd = {
      ...newAssignment,
      id: assignments.length + 1,
      completionRate: 0,
      assignedTo: 'Unassigned'
    };
    setAssignments([...assignments, assignmentToAdd]);
    setShowCreateModal(false);
    // Reset form
    setNewAssignment({
      title: '',
      course: '',
      description: '',
      dueDate: '',
      files: []
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Book className="mr-3 text-blue-600" /> 
              Assignment Management
            </h1>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <Plus className="mr-2" /> Create New Assignment
            </button>
          </div>

          {/* Assignments Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-left">Assignment</th>
                  <th className="p-4 text-left">Course</th>
                  <th className="p-4 text-left">Due Date</th>
                  <th className="p-4 text-left">Assigned To</th>
                  <th className="p-4 text-left">Completion</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-semibold">{assignment.title}</div>
                      <div className="text-sm text-gray-500">{assignment.description}</div>
                    </td>
                    <td className="p-4">{assignment.course}</td>
                    <td className="p-4 flex items-center">
                      <Calendar className="mr-2 text-gray-500" size={16} />
                      {assignment.dueDate}
                    </td>
                    <td className="p-4">
                      <User className="inline mr-2 text-gray-500" size={16} />
                      {assignment.assignedTo}
                    </td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            assignment.completionRate > 70 
                              ? 'bg-green-500' 
                              : assignment.completionRate > 40 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`} 
                          style={{width: `${assignment.completionRate}%`}}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {assignment.completionRate}% Completed
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create Assignment Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create New Assignment</h2>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Assignment Title" 
                    className="w-full p-2 border rounded"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                  <textarea 
                    placeholder="Description" 
                    className="w-full p-2 border rounded"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  ></textarea>
                  <input 
                    type="text" 
                    placeholder="Course" 
                    className="w-full p-2 border rounded"
                    value={newAssignment.course}
                    onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                  />
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setShowCreateModal(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateAssignment}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Create Assignment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AssignmentManagementPage;
