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
  IconButton,
} from '@mui/material';
import { Download as DownloadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const FileManagement = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to continue');
          return;
        }
        const response = await axios.get('http://localhost:8000/api/v1/files/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(response.data);
      } catch (err) {
        setError('Failed to load files');
      }
    };
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/v1/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setFiles([...files, response.data]);
      setSelectedFile(null);
      setError('');
    } catch (err) {
      setError('Failed to upload file');
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/v1/files/${fileId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download file');
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/v1/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(files.filter((file) => file.id !== fileId));
      setError('');
    } catch (err) {
      setError('Failed to delete file');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        File Management
      </Typography>

      <Box component="form" onSubmit={handleUpload} sx={{ mb: 4 }}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
        <Typography sx={{ display: 'inline', ml: 2 }}>
          {selectedFile ? selectedFile.name : 'No file selected'}
        </Typography>
        <Button type="submit" variant="contained" sx={{ ml: 2 }}>
          Upload
        </Button>
      </Box>

      {files.length === 0 ? (
        <Typography>No files uploaded yet</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Uploaded At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.filename}</TableCell>
                <TableCell>{new Date(file.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDownload(file.id, file.filename)}>
                    <DownloadIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(file.id)}>
                    <DeleteIcon />
                  </IconButton>
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

export default FileManagement;