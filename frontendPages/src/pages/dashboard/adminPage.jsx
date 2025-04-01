import React, { useState } from 'react';
import { 
  Book, 
  Users, 
  FileText, 
  Bell, 
  BookOpen, 
  UserPlus, 
  ListTodo,
  ChevronRight
} from 'lucide-react';
import image from '../../components/svgs/image.jpg';
import { Link } from 'react-router-dom';
// import Link from 'next/link';
// import { BookOpen } from 'react-feather';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy data for summary cards
  const summaryData = [
    { 
      icon: <Book className="w-8 h-8 text-blue-600" />, 
      title: "Total Courses", 
      value: 24,
      bg: "bg-blue-50"
    },
    { 
      icon: <Users className="w-8 h-8 text-green-600" />, 
      title: "Total Students", 
      value: 1523,
      bg: "bg-green-50"
    },
    { 
      icon: <FileText className="w-8 h-8 text-purple-600" />, 
      title: "Total Assignments", 
      value: 87,
      bg: "bg-purple-50"
    }
  ];

  // Dummy data for assignment completion chart
  const completionData = [
    { month: 'Jan', completion: 65 },
    { month: 'Feb', completion: 72 },
    { month: 'Mar', completion: 80 },
    { month: 'Apr', completion: 85 },
    { month: 'May', completion: 88 }
  ];

  // Dummy data for notifications
  const notifications = [
    { 
      id: 1, 
      icon: <BookOpen className="w-5 h-5 text-blue-600" />, 
      message: "New course 'Advanced Python' added", 
      time: "2 mins ago" 
    },
    { 
      id: 2, 
      icon: <UserPlus className="w-5 h-5 text-green-600" />, 
      message: "25 students enrolled in Machine Learning", 
      time: "15 mins ago" 
    },
    { 
      id: 3, 
      icon: <ListTodo className="w-5 h-5 text-purple-600" />, 
      message: "Assignment 'Data Structures Project' created", 
      time: "1 hour ago" 
    }
  ];

  // Quick navigation cards
  const navigationCards = [
    { 
      icon: <Book className="w-10 h-10 text-blue-600" />, 
      title: "Manage Courses", 
      description: "View and edit course details" 
    },
    { 
      icon: <Users className="w-10 h-10 text-green-600" />, 
      title: "Student Management", 
      description: "Track student progress" 
    },
    { 
      icon: <FileText className="w-10 h-10 text-purple-600" />, 
      title: "Assignments", 
      description: "Create and monitor tasks" 
    }
  ];

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
            { name: 'Courses', icon: <BookOpen className="w-5 h-5" />, key: 'courses' ,link: '/course' },
            { name: 'Students', icon: <Users className="w-5 h-5" />, key: 'students' ,link: '/students' },
            { name: 'Assignments', icon: <FileText className="w-5 h-5" />, key: 'assignments' ,link: '/assignments' }
          ].map((item) => (
            <Link to={item.link}>
            <button 
              key={item.key}
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
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </div>
            <img 
              src={image}
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {summaryData.map((card, index) => (
            <div 
              key={index} 
              className={`
                ${card.bg} p-6 rounded-xl shadow-md 
                transform transition-all duration-300 
                hover:-translate-y-2 hover:shadow-lg
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  {card.icon}
                  <h3 className="text-sm text-gray-600 mt-2">{card.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-6">
      {/* Assignment Completion Chart */}
      <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Assignment Completion</h3>
        <div className="h-64 flex items-end">
          <div className="flex-1 flex justify-between items-end h-full space-x-2">
            {completionData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-12 bg-blue-500 rounded-t-lg flex items-end justify-center "
                  style={{
                    height: `${item.completion}%`,
                    transition: 'height 0.5s ease-in-out'
                  }}
                >
                  <span className="text-xs text-white pb-1">{item.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {completionData.map(item => (
            <span key={item.month} className="w-12 text-center">{item.month}</span>
          ))}
        </div>
      </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
              <span className="text-sm text-blue-600 cursor-pointer">View All</span>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="mr-4">{notification.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Navigation */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Navigation</h3>
          <div className="grid grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <div 
                key={index} 
                className="
                  bg-white rounded-xl shadow-md p-6 
                  transform transition-all duration-300 
                  hover:-translate-y-2 hover:shadow-lg 
                  cursor-pointer flex items-center
                "
              >
                <div className="mr-6">{card.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;