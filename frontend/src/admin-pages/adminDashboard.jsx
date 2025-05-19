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

import DefaultLayout from '../components/DefaultLayout';
import StatCard from '../components/StatCard';
import GroupedBarChart from '../components/GroupedBarChart';
import GridTable from '../components/GridTable';


// Dummy data for bar chart
const barData = [
  { name: 'BSCS', Female: 90, Male: 80 },
  { name: 'BACMA', Female: 85, Male: 70 },
  { name: 'BSAM', Female: 70, Male: 50 },
  { name: 'BAE', Female: 60, Male: 40 },
  { name: 'DSES', Female: 20, Male: 15 },
  { name: 'BSDS', Female: 20, Male: 15 },
  { name: 'AASS', Female: 20, Male: 15 },
  { name: 'BSB', Female: 20, Male: 15 },
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

const recentDraftColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'formType', headerName: 'Form Type', flex: 1 },
  { field: 'student', headerName: 'Student Name', flex: 1 },
];

const recentDraftRows = [...Array(4)].map((_, i) => ({
  id: i + 1,
  formType: `Form Type ${i + 1}`,
  student: `Student Name`,
}));

const recentSubmissionColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'submittedBy', headerName: 'Submitted By', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'formType', headerName: 'Form Type', flex: 1 },
];

const recentSubmissionRows = [
  { id: 1, submittedBy: 'Juan Dela Cruz', date: '2025-05-01', formType: 'SCIF' },
  { id: 2, submittedBy: 'Maria Clara', date: '2025-05-02', formType: 'BIS' },
  { id: 3, submittedBy: 'Pedro Penduko', date: '2025-05-03', formType: 'SCIF' },
  { id: 4, submittedBy: 'Luna Lovegood', date: '2025-05-04', formType: 'BIS' },
];

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
turn <Navigate to="/" replace />;

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
          <Grid container spacing={4}>
            {summaryData.map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <StatCard {...item} />
              </Grid>
            ))}
          </Grid>

          {/* Chart and Recent Submissions */}
            <Grid item xs={24} md={8}>
              <GroupedBarChart
                data={barData}
                keys={['Female', 'Male']}
                xKey="name"
                title="Students per Degree Program"
                totalValue="1,245"
                trendLabel="+3.2%"
                trendColor="success"
                subtitle="Enrollment per program as of May 2025"
              />
            </Grid>

            <Grid item xs={12} md={4}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Submissions
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <GridTable
                    rows={recentSubmissionRows}
                    columns={recentSubmissionColumns}
                  />
                </CardContent>
            </Grid>

          {/* Recently Drafted */}

            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recently Drafted
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <GridTable
                rows={recentDraftRows}
                columns={recentDraftColumns}
              />
            </CardContent>
        </Stack>
      </Box>
    </DefaultLayout>
  );
};

export default AdminDashboard;
