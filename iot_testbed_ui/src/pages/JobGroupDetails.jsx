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
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobGroupDetails = () => {
  const { id } = useParams();
  const [jobGroup, setJobGroup] = useState(null);
  const [devices, setDevices] = useState({});
  const [files, setFiles] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch job group details and related device/file info
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to continue');
          return;
        }

        const groupResponse = await axios.get(`http://localhost:8000/api/v1/job-groups/${id}`, {
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
          axios.get(`http://localhost:8000/api/v1/devices/${deviceId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const deviceResponses = await Promise.all(devicePromises);
        const deviceMap = Object.fromEntries(
          deviceResponses.map((res) => [res.data.id, res.data.name])
        );
        setDevices(deviceMap);

        const filePromises = fileIds.map((fileId) =>
          axios.get(`http://localhost:8000/api/v1/files/${fileId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );
        const fileResponses = await Promise.all(filePromises);
        const fileMap = Object.fromEntries(
          fileResponses.map((res) => [res.data.id, res.data.filename])
        );
        setFiles(fileMap);

        setError('');
      } catch (err) {
        setError('Failed to load job group details or related data');
      }
    };
    fetchDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/monitor-jobs');
  };

  if (!jobGroup) {
    return (
      <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Group: {jobGroup.name}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography><strong>Status:</strong> {jobGroup.status}</Typography>
        <Typography><strong>Created At:</strong> {new Date(jobGroup.created_at).toLocaleString()}</Typography>
        <Typography>
          <strong>Started At:</strong> {jobGroup.started_at ? new Date(jobGroup.started_at).toLocaleString() : '-'}
        </Typography>
        <Typography>
          <strong>Completed At:</strong> {jobGroup.completed_at ? new Date(jobGroup.completed_at).toLocaleString() : '-'}
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Jobs
      </Typography>
      {jobGroup.jobs.length === 0 ? (
        <Typography>No jobs in this group</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Source File</TableCell>
              <TableCell>Output File</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Started At</TableCell>
              <TableCell>Completed At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobGroup.jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{devices[job.device_id] || job.device_id}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>{files[job.source_file_id] || job.source_file_id}</TableCell>
                <TableCell>{job.output_file_id ? files[job.output_file_id] || job.output_file_id : '-'}</TableCell>
                <TableCell>{new Date(job.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  {job.started_at ? new Date(job.started_at).toLocaleString() : '-'}
                </TableCell>
                <TableCell>
                  {job.completed_at ? new Date(job.completed_at).toLocaleString() : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
        Back to Monitoring
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default JobGroupDetails;