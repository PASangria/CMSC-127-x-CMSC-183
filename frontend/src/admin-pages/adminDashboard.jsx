import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box, Stack, Typography, Grid, CardContent, Divider, Card
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
  const [totalStudents, setTotalStudents] = useState(0);
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

        if (barRes?.ok) {
          const json = await barRes.json();
          setBarData(json.barData || []);
          setTotalStudents(json.totalStudents || 0);  
        }
        if (summaryRes?.ok) {
          const json = await summaryRes.json();
          setSummaryData(json.summary || []);
        }
        if (recentSubsRes?.ok) {
          const json = await recentSubsRes.json();
          setRecentSubmissions(json || []);
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

  console.log(recentSubmissions);
  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (!user || role !== 'admin') return <Navigate to="/" replace />;

  const recentSubmissionColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'student_name', headerName: 'Submitted By', flex: 1 },
    { field: 'student_number', headerName: 'Student Number', width: 70 },
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
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            {summaryData.map((item, index) => (
              <Box key={index} flex={1}>
                <StatCard {...item} />
              </Box>
            ))}
          </Box>

          {/* Chart and Recent Submissions in Flex Layout */}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <Box flex={2}>
              <GroupedBarChart
                data={barData}
                keys={['Female', 'Male']}
                xKey="name"
                title="Students per Degree Program"
                totalValue={totalStudents}
                trendLabel="+3.2%"
                trendColor="success"
                subtitle="Enrollment per program as of May 2025"
              />
            </Box>
            <Box flex={1}>
              <Card variant="outlined">
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
              </Card>
            </Box>
          </Box>

          {/* Recently Drafted in Card */}
          <Card variant="outlined">
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
          </Card>
        </Stack>
      </Box>
    </DefaultLayout>
  );
};