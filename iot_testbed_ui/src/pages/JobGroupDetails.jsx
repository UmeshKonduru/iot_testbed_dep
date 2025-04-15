import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Container,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Build as BuildIcon,
  Group as GroupIcon,
  ErrorOutline as ErrorOutlineIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobGroupDetails = () => {
  const { id } = useParams();
  const [jobGroup, setJobGroup] = useState(null);
  const [devices, setDevices] = useState({});
  const [files, setFiles] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch job group details and related device/file info
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to continue');
          setLoading(false);
          return;
        }

        const groupResponse = await axios.get(`${API_BASE}/job-groups/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobGroup(groupResponse.data);

        const deviceIds = [...new Set(groupResponse.data.jobs.map((job) => job.device_id))];
        const fileIds = [
          ...new Set(
            groupResponse.data.jobs
              .flatMap((job) => [job.source_file_id, job.output_file_id])
              .filter((id) => id !== null)
          ),
        ];

        const devicePromises = deviceIds.map((deviceId) =>
          axios.get(`${API_BASE}/devices/${deviceId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const deviceResponses = await Promise.all(devicePromises);
        const deviceMap = Object.fromEntries(
          deviceResponses.map((res) => [res.data.id, res.data.name])
        );
        setDevices(deviceMap);

        const filePromises = fileIds.map((fileId) =>
          axios.get(`${API_BASE}/files/${fileId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const fileResponses = await Promise.all(filePromises);
        const fileMap = Object.fromEntries(
          fileResponses.map((res) => [res.data.id, res.data.filename])
        );
        setFiles(fileMap);

        setError('');
        setLoading(false);
      } catch (err) {
        setError('Failed to load job group details or related data');
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/monitor-jobs');
  };

  const getStatusChip = (status) => {
    let color = 'default';
    
    switch(status.toLowerCase()) {
      case 'pending':
        color = 'warning';
        break;
      case 'running':
        color = 'info';
        break;
      case 'completed':
        color = 'success';
        break;
      case 'failed':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    
    return <Chip label={status} color={color} size="small" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar - matching the previous components */}
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50', marginBottom: 4 }}>
        <Toolbar>
          <BuildIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Management System
          </Typography>
          <Button color="inherit" startIcon={<GroupIcon />} component={Link} to="/dashboard">
            Dashboard
          </Button>
          {/* <Button color="inherit" variant="outlined" sx={{ ml: 2 }}>
            Logout
          </Button> */}
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #f9f9f9 0%, #f0f0f0 100%)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: '#2c3e50',
                display: 'flex',
                alignItems: 'center' 
              }}
            >
              <AssignmentIcon sx={{ mr: 1 }} />
              Job Group Details
            </Typography>
            
            <Button 
              variant="outlined" 
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{ borderRadius: 2 }}
            >
              Back to Monitoring
            </Button>
          </Box>
          
          <Divider sx={{ mb: 4 }} />

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : jobGroup ? (
            <>
              <Card sx={{ mb: 4, borderRadius: 2, background: 'rgba(236, 240, 241, 0.6)' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {jobGroup.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 2 }}>
                    <Box sx={{ minWidth: '200px' }}>
                      <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                      <Box sx={{ mt: 1 }}>
                        {getStatusChip(jobGroup.status)}
                      </Box>
                    </Box>
                    
                    <Box sx={{ minWidth: '200px' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        <ScheduleIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Created At
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formatDate(jobGroup.created_at)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ minWidth: '200px' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        <ScheduleIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Started At
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formatDate(jobGroup.started_at)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ minWidth: '200px' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        <ScheduleIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Completed At
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formatDate(jobGroup.completed_at)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2, 
                  color: '#2c3e50',
                  display: 'flex',
                  alignItems: 'center' 
                }}
              >
                <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
                Jobs in this Group
              </Typography>

              {jobGroup.jobs.length === 0 ? (
                <Card sx={{ borderRadius: 2, background: 'rgba(236, 240, 241, 0.6)', py: 4 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <AssignmentIcon sx={{ fontSize: 60, color: '#bdc3c7', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>No jobs in this group</Typography>
                    <Typography variant="body2" color="text.secondary">
                      This job group doesn't contain any jobs
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Device Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Source File</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Output File</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Started At</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Completed At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobGroup.jobs.map((job) => (
                        <TableRow 
                          key={job.id}
                          sx={{ 
                            '&:hover': { backgroundColor: 'rgba(52, 152, 219, 0.05)' },
                            transition: 'background-color 0.2s ease-in-out'
                          }}
                        >
                          <TableCell>{devices[job.device_id] || job.device_id}</TableCell>
                          <TableCell>{getStatusChip(job.status)}</TableCell>
                          <TableCell>{files[job.source_file_id] || job.source_file_id}</TableCell>
                          <TableCell>{job.output_file_id ? files[job.output_file_id] || job.output_file_id : '-'}</TableCell>
                          <TableCell>{formatDate(job.created_at)}</TableCell>
                          <TableCell>{formatDate(job.started_at)}</TableCell>
                          <TableCell>{formatDate(job.completed_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )}
            </>
          ) : (
            <Typography>No data available</Typography>
          )}
          
          {error && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
              <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />
              <Typography color="error">
                {error}
              </Typography>
            </Box>
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

export default JobGroupDetails;