import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSubmission from './pages/JobSubmission';
import FileManagement from './pages/FileManagement';
import AddGateway from './pages/AddGateway';
import JobMonitoring from './pages/JobMonitoring';
import JobGroupDetails from './pages/JobGroupDetails';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    
    <Router>
      <AppBar position="static">
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      IoT Testbed
    </Typography>
    {
      <>
        <Button 
          color="inherit" 
          component={Link} 
          to="/submit-jobs"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            } 
          }}
        >
          Submit Jobs
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/files"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            } 
          }}
        >
          Files
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/add-gateway"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            } 
          }}
        >
          Add Gateway
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/monitor-jobs"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            } 
          }}
        >
          Monitor Jobs
        </Button>
        <Button 
          color="inherit" 
          onClick={handleLogout}
          sx={{ 
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              transition: 'all 0.5s ease'
            } 
          }}
        >
          Logout
        </Button>
      </>
    }
  </Toolbar>
</AppBar>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-jobs" element={<JobSubmission />} />
        <Route path="/files" element={<FileManagement />} />
        <Route path="/add-gateway" element={<AddGateway />} />
        <Route path="/monitor-jobs" element={<JobMonitoring />} />
        <Route path="/job-groups/:id" element={<JobGroupDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
      {/* <footer style={{ textAlign: 'center', padding: '1em', background: '#f1f1f1', marginTop: '2em' }}>
          <Typography variant="body2" color="textSecondary">
            © 2023 IoT Testbed. All rights reserved. | <Link to="/privacy-policy">Privacy Policy</Link>
          </Typography>
        </footer> */}
      
    </Router>
  );
}

export default App;