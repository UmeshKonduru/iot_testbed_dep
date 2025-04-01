
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/login/LoginPage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import ExperimentDashboard from './pages/dashboard/dashboard'
import NewExperiment from './pages/dashboard/newExperiment'
import IoTLogsPage from './pages/dashboard/logs'
import { useLocation } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/adminPage'
import CourseManagement from './pages/dashboard/courseManagement'
import StudentManagement from './pages/dashboard/studentManagement'
import AssignmentManagementPage from './pages/dashboard/assignmentManagement'
import IoTRPRInterface from './pages/rasp/conn'
import FilesPage from './pages/rasp/filesPage'
import LogsPage from './pages/rasp/logsPage'
import DevicesPage from './pages/rasp/devicesPage'
import DeviceMapper from './pages/rasp/deviceMapper'
import DeviceSelectionPage from './pages/rasp/deviceSelectionPage'
const App = () => {
  const location = useLocation();

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/dashboard' element={<ExperimentDashboard />} />
        <Route path='/newexp' element={<NewExperiment />} />
        <Route path='/logs' element={<IoTLogsPage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/course' element={<CourseManagement />} />
        <Route path='/students' element={<StudentManagement />} />
        <Route path='/assignments' element={<AssignmentManagementPage />} />
        <Route path='/rpr' element={<IoTRPRInterface />} />
        <Route path='/files' element={<FilesPage />} />
        <Route path='/ilog' element={<LogsPage />} />
        <Route path='/devices' element={<DevicesPage />} />
        <Route path='/mapper' element={<DeviceMapper />} />
        <Route path='/selection' element={<DeviceSelectionPage />} />
      </Routes>
    </div>
  );
};

export default App
