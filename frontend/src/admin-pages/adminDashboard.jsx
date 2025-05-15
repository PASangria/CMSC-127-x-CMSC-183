import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

import DefaultLayout from '../components/DefaultLayout';
import StatCard from '../components/StatCard';

// Dummy data for bar chart
const barData = [
  { name: 'BSCS', Female: 90, Male: 80 },
  { name: 'BSES', Female: 85, Male: 70 },
  { name: 'BSAM', Female: 70, Male: 50 },
  { name: 'BA', Female: 60, Male: 40 },
  { name: 'DSES', Female: 20, Male: 15 },
];

const now = new Date();
const todayFormatted = now.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
});

// Updated Stat Cards Summary Data
const summaryData = [
  {
    title: 'Total Number of Students',
    value: '1,245',
    trend: 'up',
    interval: `Registered users as of ${todayFormatted}`,
    data: [0, 5, 8, 12, 15, 22, 30, 35, 38, 40, 45], // Add more if needed; StatCard handles padding
  },
  {
    title: 'SCIF Submissions',
    value: '320',
    trend: 'neutral',
    interval: `SCIF Submissions This Month (recent - ${todayFormatted})`,
    data: [5, 10, 20, 30, 50, 70, 110],
  },
  {
    title: 'BIS Submissions',
    value: '210',
    trend: 'down',
    interval: `BIS Submissions This Month (recent - ${todayFormatted})`,
    data: [15, 18, 20, 25, 20, 15, 10],
  },
];

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;

  return (
    <DefaultLayout variant="admin">
      <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 3, md: 5 }, width: '100%' }}>
        <Stack spacing={4}>
          <Typography variant="h5" fontWeight="bold">
            Welcome, {user.email}
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={2}>
            {summaryData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StatCard {...item} />
              </Grid>
            ))}
          </Grid>

          {/* Chart and Table Section */}
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

          {/* Recently Drafted Section */}
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