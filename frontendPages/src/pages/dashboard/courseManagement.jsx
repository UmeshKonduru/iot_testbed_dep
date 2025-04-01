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
  UserPlus, 
  ListTodo, 
  ChevronRight 
} from 'lucide-react';
import image from '../../components/svgs/image.jpg';

const CourseManagement = () => {
  // Sidebar active tab state
  const [activeTab, setActiveTab] = useState('courses');

  // Dummy data for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Advanced Python',
      description: 'Deep dive into Python advanced concepts',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      students: [
        { id: 1, name: 'Emma Johnson', email: 'emma@example.com' },
        { id: 2, name: 'Alex Rodriguez', email: 'alex@example.com' }
      ]
    },
    {
      id: 2,
      name: 'Data Science Fundamentals',
      description: 'Introduction to data science and analytics',
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      students: [
        { id: 3, name: 'Sarah Lee', email: 'sarah@example.com' },
        { id: 4, name: 'Michael Chen', email: 'michael@example.com' }
      ]
    }
  ]);

  // State for new course form
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  // State for editing existing course
  const [editingCourse, setEditingCourse] = useState(null);

  // Handler to add a new course
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description || !newCourse.startDate || !newCourse.endDate) {
      alert('Please fill in all fields');
      return;
    }

    const courseToAdd = {
      ...newCourse,
      id: courses.length + 1,
      students: []
    };

    setCourses([...courses, courseToAdd]);
    setNewCourse({ name: '', description: '', startDate: '', endDate: '' });
    setIsAddingCourse(false);
  };

  // Handler to delete a course
  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  // Handler to edit a course
  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  // Handler to save edited course
  const handleSaveEditedCourse = () => {
    setCourses(courses.map(course => 
      course.id === editingCourse.id ? editingCourse : course
    ));
    setEditingCourse(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
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
                onClick={() => setActiveTab(item.key)}
                className={`
                  w-full flex items-center p-3 rounded-lg transition-all duration-200
                  ${activeTab === item.key 
                    ? 'bg-blue-100 text-blue-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content: Course Management */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
          <button 
            onClick={() => setIsAddingCourse(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="mr-2" /> Add New Course
          </button>
        </div>

        {/* New Course Form */}
        {isAddingCourse && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2 text-blue-600" /> Add New Course
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <textarea 
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="border rounded-lg px-3 py-2"
              />
              <div className="flex items-center">
                <label className="mr-2">Start Date:</label>
                <input 
                  type="date"
                  value={newCourse.startDate}
                  onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">End Date:</label>
                <input 
                  type="date"
                  value={newCourse.endDate}
                  onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                onClick={() => setIsAddingCourse(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCourse}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Course
              </button>
            </div>
          </div>
        )}

        {/* Courses List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white shadow-md rounded-lg p-6 relative"
            >
              {/* Course Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={() => handleEditCourse(course)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Course Details */}
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 text-blue-500" />
                <span>{course.startDate} to {course.endDate}</span>
              </div>

              {/* Students Section */}
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <Users className="mr-2 text-green-500" />
                  <h3 className="font-medium">Enrolled Students</h3>
                </div>
                {course.students.length > 0 ? (
                  <ul className="space-y-1">
                    {course.students.map((student) => (
                      <li 
                        key={student.id} 
                        className="text-sm text-gray-700"
                      >
                        {student.name} ({student.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No students enrolled</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
