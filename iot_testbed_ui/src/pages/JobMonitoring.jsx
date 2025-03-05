import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobMonitoring = () => {
  const [jobGroups, setJobGroups] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchJobGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to continue');
        return;
      }
      const response = await axios.get('http://localhost:8000/api/v1/job-groups/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobGroups(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load job groups');
    }
  };

  useEffect(() => {
    fetchJobGroups();
  }, []);

  const handleRefresh = () => {
    fetchJobGroups();
  };

  const handleRowClick = (groupId) => {
    navigate(`/job-groups/${groupId}`);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Monitoring
      </Typography>
      <Button variant="contained" onClick={handleRefresh} sx={{ mb: 2 }}>
        Refresh
      </Button>

      {jobGroups.length === 0 ? (
        <Typography>No job groups submitted yet</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Started At</TableCell>
              <TableCell>Completed At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobGroups.map((group) => (
              <TableRow
                key={group.id}
                onClick={() => handleRowClick(group.id)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
              >
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.status}</TableCell>
                <TableCell>{new Date(group.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  {group.started_at ? new Date(group.started_at).toLocaleString() : '-'}
                </TableCell>
                <TableCell>
                  {group.completed_at ? new Date(group.completed_at).toLocaleString() : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default JobMonitoring;