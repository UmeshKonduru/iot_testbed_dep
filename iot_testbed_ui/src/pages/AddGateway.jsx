import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import axios from 'axios';

const AddGateway = () => {
  const [gatewayName, setGatewayName] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleCreateGateway = async (e) => {
    e.preventDefault();
    if (!gatewayName) {
      setError('Please enter a gateway name');
      return;
    }

    try {
      const tokenAuth = localStorage.getItem('token');
      if (!tokenAuth) {
        setError('Please log in to continue');
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/gateways/',
        { name: gatewayName },
        {
          headers: { Authorization: `Bearer ${tokenAuth}` },
        }
      );
      setToken(response.data.token);
      setGatewayName('');
      setError('');
    } catch (err) {
      setError('Failed to create gateway');
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Gateway
      </Typography>
      <Box component="form" onSubmit={handleCreateGateway} sx={{ mb: 4 }}>
        <TextField
          label="Gateway Name"
          fullWidth
          margin="normal"
          value={gatewayName}
          onChange={(e) => setGatewayName(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Create Gateway
        </Button>
      </Box>

      {token && (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Registration Token:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
              {token}
            </Typography>
            <IconButton onClick={handleCopyToken}>
              <CopyIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Use this token to register your gateway with the system.
          </Typography>
        </Paper>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AddGateway;