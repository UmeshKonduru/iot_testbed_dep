import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  BookOpen, 
  Users, 
  FileText, 
  Bell, 
  UserPlus, 
  ListTodo, 
  ChevronRight,
  Eye,
  Trash2,
  Calendar,
  Mail,
  X
} from 'lucide-react';
import image from '../../components/svgs/image.jpg';

const StudentManagement = () => {
  // Sidebar active tab state
  const [activeTab, setActiveTab] = useState('students');

  // Dummy data for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Advanced Python Programming',
      students: [
        {
          id: 1,
          name: 'Emma Johnson',
          email: 'emma.johnson@example.com',
          enrollmentDate: '2024-01-15',
          assignments: [
            { 
              id: 1, 
              title: 'Python Project', 
              status: 'Submitted', 
              grade: 85,
              deadline: '2024-03-15'
            },
            { 
              id: 2, 
              title: 'Advanced Algorithms', 
              status: 'Pending', 
              grade: null,
              deadline: '2024-04-01'
            }
          ]
        },
        {
          id: 2,
          name: 'Alex Rodriguez',
          email: 'alex.rodriguez@example.com',
          enrollmentDate: '2024-02-01',
          assignments: [
            { 
              id: 3, 
              title: 'Data Structures', 
              status: 'Graded', 
              grade: 92,
              deadline: '2024-03-20'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Data Science Fundamentals',
      students: [
        {
          id: 3,
          name: 'Sarah Lee',
          email: 'sarah.lee@example.com',
          enrollmentDate: '2024-02-15',
          assignments: [
            { 
              id: 4, 
              title: 'Data Analysis Report', 
              status: 'Submitted', 
              grade: 88,
              deadline: '2024-04-10'
            }
          ]
        }
      ]
    }
  ]);

  // State for selected course and modal views
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    enrollmentDate: ''
  });

  // Handler to add a new student to the selected course
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.enrollmentDate) {
      alert('Please fill in all fields');
      return;
    }

    const studentToAdd = {
      ...newStudent,
      id: selectedCourse.students.length + 1,
      assignments: []
    };

    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, students: [...course.students, studentToAdd] } 
        : course
    );

    setCourses(updatedCourses);
    setSelectedCourse({
      ...selectedCourse, 
      students: [...selectedCourse.students, studentToAdd]
    });

    // Reset form and close modal
    setNewStudent({ name: '', email: '', enrollmentDate: '' });
    setIsAddStudentModalOpen(false);
  };

  // Handler to remove a student from the course
  const handleRemoveStudent = (studentId) => {
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, students: course.students.filter(student => student.id !== studentId) } 
        : course
    );

    setCourses(updatedCourses);
    setSelectedCourse({
      ...selectedCourse, 
      students: selectedCourse.students.filter(student => student.id !== studentId)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Student Management</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <img 
              src={image}
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Course Selector & Add Student Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Select Course:</label>
            <select 
              value={selectedCourse.id}
              onChange={(e) => {
                const course = courses.find(c => c.id === parseInt(e.target.value));
                setSelectedCourse(course);
              }}
              className="border rounded-lg px-3 py-2"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setIsAddStudentModalOpen(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <UserPlus className="mr-2" /> Add Student
          </button>
        </div>

        {/* Students List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCourse.students.map((student) => (
            <div 
              key={student.id} 
              className="bg-white shadow-md rounded-lg p-6 relative"
            >
              {/* Student Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={() => setSelectedStudent(student)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleRemoveStudent(student.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Student Details */}
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src={image} 
                    alt={student.name} 
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <Mail className="mr-2 w-4 h-4 text-blue-500" />
                    {student.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <Calendar className="mr-2 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Enrolled: {student.enrollmentDate}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="mr-2 text-green-500" />
                  Assignments ({student.assignments.length})
                </h4>
                {student.assignments.length > 0 ? (
                  <ul className="space-y-1">
                    {student.assignments.map((assignment) => (
                      <li 
                        key={assignment.id} 
                        className="text-sm text-gray-700 flex justify-between"
                      >
                        <span>{assignment.title}</span>
                        <span 
                          className={`
                            ml-2 px-2 py-1 rounded-full text-xs
                            ${
                              assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                              assignment.status === 'Graded' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          `}
                        >
                          {assignment.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No assignments</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Student Profile Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[500px] relative">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center mb-6">
                <img 
                  src={image} 
                  alt={selectedStudent.name} 
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-gray-600 flex items-center">
                    <Mail className="mr-2 w-5 h-5 text-blue-500" />
                    {selectedStudent.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-medium text-gray-700">Enrollment Date</p>
                  <p className="text-gray-600">{selectedStudent.enrollmentDate}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 text-green-500" /> 
                  Assignments
                </h3>
                {selectedStudent.assignments.length > 0 ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Assignment</th>
                        <th className="border p-2 text-center">Status</th>
                        <th className="border p-2 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStudent.assignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td className="border p-2">{assignment.title}</td>
                          <td className="border p-2 text-center">
                            <span 
                              className={`
                                px-2 py-1 rounded-full text-xs
                                ${
                                  assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                                  assignment.status === 'Graded' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }
                              `}
                            >
                              {assignment.status}
                            </span>
                          </td>
                          <td className="border p-2 text-center">
                            {assignment.grade ?? 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No assignments</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96 relative">
            <button 
              onClick={() => setIsAddStudentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <UserPlus className="mr-2 text-blue-600" /> Add New Student
            </h3>
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Full Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input 
                type="email"
                placeholder="Email Address"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="flex items-center">
                <label className="mr-2">Enrollment Date:</label>
                <input 
                  type="date"
                  value={newStudent.enrollmentDate}
                  onChange={(e) => setNewStudent({ ...newStudent, enrollmentDate: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddStudent}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
