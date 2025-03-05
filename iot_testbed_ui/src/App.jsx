import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSubmission from './pages/JobSubmission';
import FileManagement from './pages/FileManagement';
import AddGateway from './pages/AddGateway';
import JobMonitoring from './pages/JobMonitoring';
import JobGroupDetails from './pages/JobGroupDetails';

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
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/submit-jobs">
                Submit Jobs
              </Button>
              <Button color="inherit" component={Link} to="/files">
                Files
              </Button>
              <Button color="inherit" component={Link} to="/add-gateway">
                Add Gateway
              </Button>
              <Button color="inherit" component={Link} to="/monitor-jobs">
                Monitor Jobs
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-jobs" element={<JobSubmission />} />
        <Route path="/files" element={<FileManagement />} />
        <Route path="/add-gateway" element={<AddGateway />} />
        <Route path="/monitor-jobs" element={<JobMonitoring />} />
        <Route path="/job-groups/:id" element={<JobGroupDetails />} />
      </Routes>
    </Router>
  );
}

export default App;