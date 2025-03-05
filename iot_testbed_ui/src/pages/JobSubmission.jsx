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
} from '@mui/material';
import axios from 'axios';

const JobSubmission = () => {
  const [jobGroupName, setJobGroupName] = useState('');
  const [devices, setDevices] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to continue');
          return;
        }

        const devicesResponse = await axios.get('http://localhost:8000/api/v1/devices/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevices(devicesResponse.data);

        const filesResponse = await axios.get('http://localhost:8000/api/v1/files/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(filesResponse.data);
      } catch (err) {
        setError('Failed to load devices or files');
      }
    };
    fetchData();
  }, []);

  const handleDeviceToggle = (deviceId) => {
    const isSelected = selectedDevices.some((d) => d.device_id === deviceId);
    if (isSelected) {
      setSelectedDevices(selectedDevices.filter((d) => d.device_id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, { device_id: deviceId, file_id: '' }]);
    }
  };

  const handleFileChange = (deviceId, fileId) => {
    setSelectedDevices(
      selectedDevices.map((d) =>
        d.device_id === deviceId ? { ...d, file_id: fileId } : d
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobGroupName || selectedDevices.length === 0 || selectedDevices.some((d) => !d.file_id)) {
      setError('Please fill all fields: job group name, devices, and a file for each device');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: jobGroupName,
        jobs: selectedDevices.map((d) => ({
          device_id: d.device_id,
          source_file_id: d.file_id,
        })),
      };
      await axios.post('http://localhost:8000/api/v1/job-groups/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Job group submitted successfully');
      setJobGroupName('');
      setSelectedDevices([]);
      setError('');
    } catch (err) {
      setError('Failed to submit job group');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submit Job Group
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Group Name"
          fullWidth
          margin="normal"
          value={jobGroupName}
          onChange={(e) => setJobGroupName(e.target.value)}
          required
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Select Devices:
        </Typography>
        {devices.length === 0 ? (
          <Typography>No devices available</Typography>
        ) : (
          devices.map((device) => (
            <FormControlLabel
              key={device.id}
              control={
                <Checkbox
                  checked={selectedDevices.some((d) => d.device_id === device.id)}
                  onChange={() => handleDeviceToggle(device.id)}
                />
              }
              label={device.name}
            />
          ))
        )}
        {selectedDevices.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Assign Files:
            </Typography>
            {selectedDevices.map((selection) => {
              const device = devices.find((d) => d.id === selection.device_id);
              return (
                <FormControl fullWidth margin="normal" key={selection.device_id}>
                  <InputLabel>{`File for ${device.name}`}</InputLabel>
                  <Select
                    value={selection.file_id}
                    onChange={(e) => handleFileChange(selection.device_id, e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Select a file
                    </MenuItem>
                    {files.length === 0 ? (
                      <MenuItem disabled>No files uploaded yet</MenuItem>
                    ) : (
                      files.map((file) => (
                        <MenuItem key={file.id} value={file.id}>
                          {file.filename}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              );
            })}
          </>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit Job Group
        </Button>
      </form>
    </Box>
  );
};

export default JobSubmission;