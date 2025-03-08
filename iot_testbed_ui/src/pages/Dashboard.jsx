import React, { useState, useEffect } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Paper,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Chip,
  Avatar,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Build as BuildIcon,
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  FolderOpen as FolderOpenIcon,
  Router as RouterIcon,
  Assessment as AssessmentIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Send as SendIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('John Doe');
  const [userDescription, setUserDescription] = useState('IoT Researcher');
  const [previousJobs, setPreviousJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call with dummy data
        // In a real app, you would fetch from your API
        await new Promise(resolve => setTimeout(resolve, 800)); // simulate network delay
        
        const dummyJobs = [
          { 
            id: 1, 
            name: 'Temperature Sensors Test', 
            status: 'Completed', 
            devices: 3, 
            startTime: '2025-03-01 09:30', 
            endTime: '2025-03-01 10:45',
            results: 'All sensors reported normal temperature ranges.'
          },
          { 
            id: 2, 
            name: 'Gateway Performance Analysis', 
            status: 'Running', 
            devices: 4, 
            startTime: '2025-03-05 14:20', 
            endTime: null,
            results: 'Preliminary results show 95% uptime.'
          },
          { 
            id: 3, 
            name: 'Network Latency Benchmark', 
            status: 'Scheduled', 
            devices: 2, 
            startTime: '2025-03-08 08:00', 
            endTime: null,
            results: 'Waiting to start execution.'
          }
        ];
        
        setPreviousJobs(dummyJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleNavigation = (path) => {
    window.location.href = `/${path}`;
  };

  const handleLogout = () => {
    // Add logout logic here
    window.location.href = '/login';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return { bg: '#e6f7ee', color: '#27ae60' };
      case 'Running':
        return { bg: '#e3f2fd', color: '#2196f3' };
      case 'Scheduled':
        return { bg: '#fff8e1', color: '#ffa000' };
      default:
        return { bg: '#f5f5f5', color: '#757575' };
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50', marginBottom: 4 }}>
        <Toolbar>
          <BuildIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Management System
          </Typography>
          {/* <Button color="inherit" startIcon={<SendIcon />} onClick={() => handleNavigation('submit-jobs')}>
            Submit Jobs
          </Button>
          <Button color="inherit" startIcon={<FolderOpenIcon />} onClick={() => handleNavigation('files')}>
            Files
          </Button> */}
          <Button color="inherit" startIcon={<RouterIcon />} onClick={() => handleNavigation('add-gateway')}>
            Add Gateway
          </Button>
          {/* <Button color="inherit" startIcon={<AssessmentIcon />} onClick={() => handleNavigation('monitor-jobs')}>
            Monitor Jobs
          </Button> */}
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            background: 'linear-gradient(145deg, #f9f9f9 0%, #f0f0f0 100%)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#2c3e50',
              textAlign: 'center',
              mb: 3
            }}
          >
            <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Dashboard
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* User Profile Section */}
              <Card sx={{ mb: 4, borderRadius: 2, background: 'rgba(236, 240, 241, 0.6)' }}>
                <CardContent>
                  <Grid container spacing={3} alignItems="center">
                    {/* User Avatar */}
                    <Grid item xs={12} sm={2} md={2} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Avatar 
                        sx={{ 
                          width: 100, 
                          height: 100, 
                          bgcolor: '#3498db',
                          margin: { xs: 'auto', sm: '0' }
                        }}
                      >
                        <PersonIcon sx={{ fontSize: 50 }} />
                      </Avatar>
                    </Grid>
                    
                    {/* User Info */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 1 }}>
                        {username}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {userDescription}
                      </Typography>
                    </Grid>
                    
                    {/* Quick Action Buttons */}
                    <Grid item xs={12} sm={4} md={4}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<SendIcon />}
                          sx={{ justifyContent: 'flex-start', borderRadius: 2 }}
                          onClick={() => handleNavigation('submit-jobs')}
                        >
                          Submit Jobs
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<FolderOpenIcon />}
                          sx={{ justifyContent: 'flex-start', borderRadius: 2 }}
                          onClick={() => handleNavigation('files')}
                        >
                          Files
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<RouterIcon />}
                          sx={{ justifyContent: 'flex-start', borderRadius: 2 }}
                          onClick={() => handleNavigation('add-gateway')}
                        >
                          Add Gateway
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Previous Jobs Section */}
              <Card sx={{ mt: 4, mb: 4, borderRadius: 2, background: 'rgba(236, 240, 241, 0.6)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <AssessmentIcon sx={{ mr: 1 }} />
                    Previous Jobs
                  </Typography>

                  {previousJobs.length === 0 ? (
                    <Typography>No previous jobs found</Typography>
                  ) : (
                    previousJobs.map((job) => (
                      <Paper
                        key={job.id}
                        elevation={1}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            borderColor: '#3498db'
                          }
                        }}
                        onClick={() => handleNavigation(`monitor-jobs`)}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={8}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                              {job.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap', gap: 1 }}>
                              <Chip 
                                label={job.status} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: getStatusColor(job.status).bg, 
                                  color: getStatusColor(job.status).color,
                                  fontWeight: 'bold'
                                }} 
                              />
                              <Chip 
                                label={`${job.devices} devices`} 
                                size="small" 
                                sx={{ backgroundColor: '#f5f5f5' }} 
                              />
                              <Typography variant="body2" sx={{ color: '#7f8c8d', ml: 1 }}>
                                Started: {job.startTime}
                              </Typography>
                              {job.endTime && (
                                <Typography variant="body2" sx={{ color: '#7f8c8d', ml: 1 }}>
                                  | Ended: {job.endTime}
                                </Typography>
                              )}
                            </Box>
                            <Typography variant="body2" sx={{ mt: 1, color: '#34495e' }}>
                              {job.results}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                            <IconButton 
                              color="primary" 
                              sx={{ 
                                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                '&:hover': {
                                  backgroundColor: 'rgba(52, 152, 219, 0.2)',
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigation(`monitor-jobs`);
                              }}
                            >
                              <AssessmentIcon />
                            </IconButton>
                            <IconButton 
                              sx={{ 
                                ml: 1,
                                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                                '&:hover': {
                                  backgroundColor: 'rgba(46, 204, 113, 0.2)',
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigation(`monitor-jobs`);
                              }}
                            >
                              <DescriptionIcon color="success" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))
                  )}
                </CardContent>
              </Card>

              <Button
                variant="contained"
                fullWidth
                startIcon={<SendIcon />}
                onClick={() => handleNavigation('submit-jobs')}
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: '#2c3e50',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#1a2530',
                  }
                }}
              >
                Submit New Job Group
              </Button>
            </>
          )}
        </Paper>
      </Container>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: 'white',
          pb: 2,
          pt: 1
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{ width: '20%' }} />
        </Box>
        <Box sx={{ mt: -1, py: 2, color: '#2c3e50', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Arial, sans-serif', color: '#d3d3d3' }}>
            &copy; {new Date().getFullYear()} Job Management System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;