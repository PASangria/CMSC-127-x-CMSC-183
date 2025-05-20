import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box, Stack, Typography, Grid, CardContent, Divider
} from '@mui/material';
import DefaultLayout from '../components/DefaultLayout';
import StatCard from '../components/StatCard';
import GroupedBarChart from '../components/GroupedBarChart';
import GridTable from '../components/GridTable';
import { AuthContext } from '../context/AuthContext';
import { useApiRequest } from '../context/ApiRequestContext';

export const AdminDashboard = () => {
  const { user, role, loading } = useContext(AuthContext);
  const { request } = useApiRequest();

  const [barData, setBarData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [recentDrafts, setRecentDrafts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role !== 'admin') return;

    const fetchDashboardData = async () => {
      try {
        const [barRes, summaryRes, recentSubsRes, recentDraftsRes] = await Promise.all([
          request('http://localhost:8000/api/dashboard/bar-data'),
          request('http://localhost:8000/api/dashboard/summary/'),
          request('http://localhost:8000/api/dashboard/recent-submissions/'),
          request('http://localhost:8000/api/dashboard/recent-drafts/'),
        ]);

        if (barRes?.ok) setBarData(await barRes.json());
        if (summaryRes?.ok) {
          const json = await summaryRes.json();
          setSummaryData(json.summary || []);
        }
        if (recentSubsRes?.ok) {
          const json = await recentSubsRes.json();
          setRecentSubmissions(json.results || []);
        }
        if (recentDraftsRes?.ok) {
          const json = await recentDraftsRes.json();
          setRecentDrafts(json.results || []);
        }
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchDashboardData();
  }, [role, request]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (!user || role !== 'admin') return <Navigate to="/" replace />;

  const recentSubmissionColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'submitted_by', headerName: 'Submitted By', flex: 1 },
    { field: 'submitted_on', headerName: 'Date', flex: 1 },
    { field: 'form_type', headerName: 'Form Type', flex: 1 },
  ];

  const recentDraftColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'form_type', headerName: 'Form Type', flex: 1 },
    { field: 'student_name', headerName: 'Student Name', flex: 1 },
  ];

  return (
    <DefaultLayout variant="admin">
      <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 3, md: 5 }, width: '100%' }}>
        <Stack spacing={4}>
          <Typography variant="h5" fontWeight="bold">
            Welcome, {user.email}
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          {/* Summary Cards */}
          <Grid container spacing={4}>
            {summaryData.map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <StatCard {...item} />
              </Grid>
            ))}
          </Grid>

          {/* Chart */}
          <Grid item xs={24} md={8}>
            <GroupedBarChart
              data={barData}
              keys={['Female', 'Male']}
              xKey="name"
              title="Students per Degree Program"
              totalValue={summaryData[0]?.value || '0'}
              trendLabel="+3.2%"
              trendColor="success"
              subtitle="Enrollment per program"
            />
          </Grid>

          {/* Recent Submissions */}
          <Grid item xs={12} md={4}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Submissions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <GridTable
                rows={recentSubmissions}
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
              rows={recentDrafts}
              columns={recentDraftColumns}
            />
          </CardContent>
        </Stack>
      </Box>
    </DefaultLayout>
  );
};
