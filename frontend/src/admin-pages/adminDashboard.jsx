import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiRequest } from '../utils/apiUtils';
import DefaultLayout from '../components/DefaultLayout';
import StatCard from '../components/StatCard';
import {
  Box, Stack, Typography, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Divider,
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AdminDashboard = () => {
  const { user, role, loading } = useContext(AuthContext);

  const [barData, setBarData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role !== 'admin') return;

    const fetchDashboardData = async () => {
      try {
        const barRes = await apiRequest('http://localhost:8000/api/dashboard/bar-data');
        const summaryRes = await apiRequest('http://localhost:8000/api/dashboard/summary/');

        const barJson = await barRes.json();
        const summaryJson = await summaryRes.json();

        console.log('Bar data:', barJson);
        console.log('Summary data:', summaryJson);

        if (Array.isArray(barJson)) setBarData(barJson);
        if (summaryJson?.summary) setSummaryData(summaryJson.summary);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchDashboardData();
  }, [role]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (role !== 'admin') return <Navigate to="/" replace />;
  if (!user) return <Navigate to="/" replace />;

  return (
    <DefaultLayout variant="admin">
      <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 3, md: 5 }, width: '100%' }}>
        <Stack spacing={4}>
          <Typography variant="h5" fontWeight="bold">
            Welcome, {user.email}
          </Typography>

          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}

          {/* Summary Cards */}
          <Grid container spacing={2}>
            {summaryData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StatCard {...item} />
              </Grid>
            ))}
          </Grid>

          {/* Bar Chart + Table */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Students per Degree Program
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Female" fill="#FF7F00" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Male" fill="#11073D" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Submissions
                  </Typography>
                  <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Submitted by</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Form</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...Array(4)].map((_, i) => (
                          <TableRow key={i}>
                            <TableCell>Student {i + 1}</TableCell>
                            <TableCell>2024-0{i + 1}-15</TableCell>
                            <TableCell>
                              <Button size="small" variant="outlined">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recently Drafted */}
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recently Drafted
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {[...Array(4)].map((_, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Form Type ${i + 1} : Student Name`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </DefaultLayout>
  );
};

export default AdminDashboard;
