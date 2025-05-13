import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import DefaultLayout from '../components/DefaultLayout';

export const UserPrivacySetting = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.detail || 'Something went wrong.');
        return;
      }

      toast.success('Password changed successfully!');
      setEmail('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      <Box sx={{ backgroundColor: '#7B1113', py: 2 }}>
        <Typography variant="h5" align="center" color="white" fontWeight="bold">
          PRIVACY SETTING
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ my: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="#7B1113" gutterBottom>
            CHANGE PASSWORD
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Enter current password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Enter new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Re-enter new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, backgroundColor: '#007BFF', '&:hover': { backgroundColor: '#0056b3' } }}
            >
              {loading ? 'Processing...' : 'CONFIRM'}
            </Button>
          </Box>
        </Paper>
      </Container>

      <ToastContainer />
    </>
  );

  return <DefaultLayout variant="student">{content}</DefaultLayout>;
};
