import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';

import DefaultLayout from '../components/DefaultLayout';
import StatCard from '../components/StatCard1';
import PieChartCard from '../components/PieChartCard';
import GroupedBarChart from '../components/GroupedBarChart';

// —————— DUMMY DATA ——————
const now = new Date();
const todayFormatted = now.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
});

const summaryData = [
  { title: 'Average Age', value: '23', interval: `as of ${todayFormatted}`, trend: 'neutral', data: [20,23,22,24,23,25,23] },
  { title: 'Top Region', value: 'Region 4', interval: `as of ${todayFormatted}`, trend: 'up', data: [10,15,20,25,30,35,40] },
  { title: 'Rate of student on scholarship', value: '11%', interval: `as of ${todayFormatted}`, trend: 'neutral', data: [10,11,12,11,10,11,11] },
  { title: 'Total Number of Students', value: '2,500', interval: `as of ${todayFormatted}`, trend: 'up', data: [2000,2100,2300,2400,2500,2600,2500] },
  { title: 'Top 3 Programs by student population', value: 'BSCS, BSDS, BACMA', interval: `as of ${todayFormatted}`, trend: 'neutral', data: [] },
];

const genderData = [
  { label: 'Male', value: 1000 },
  { label: 'Female', value: 1500 },
];

const regionData = [
  { name: 'Region 1', Students: 20 },
  { name: 'Region 2', Students: 35 },
  { name: 'Region 3', Students: 50 },
  { name: 'Region 4', Students: 80 },
  { name: 'Region 5', Students: 20 },
  { name: 'Region 6', Students: 25 },
  { name: 'Region 7', Students: 45 },
];

const ageData = [
  { name: 'Below 18', Students: 10 },
  { name: '18–19', Students: 30 },
  { name: '20–21', Students: 60 },
  { name: '22–23', Students: 80 },
  { name: '24–25', Students: 30 },
  { name: '26–27', Students: 20 },
  { name: 'Above 27', Students: 50 },
];

const yearLevelData = [
  { name: 'BSCS', 'First Year': 40, 'Second Year': 60, 'Third Year': 50, 'Fourth Year': 30 },
  { name: 'BSDS', 'First Year': 35, 'Second Year': 45, 'Third Year': 55, 'Fourth Year': 60 },
  { name: 'BACMA', 'First Year': 20, 'Second Year': 25, 'Third Year': 35, 'Fourth Year': 30 },
];
// ————————————————————————

export const AdminReports = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;

  const top3ProgramsCard = summaryData.find(item =>
    item.title.includes('Top 3 Programs')
  );

  return (
    <DefaultLayout variant="admin">
      <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 3, md: 5 } }}>
        <Typography variant="h5" mb={3}>
          Administrative Reports
        </Typography>

        {/* First Row: Stat Cards */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={4}>
          {summaryData.slice(0, 4).map((item, idx) => (
            <Box key={idx} flex={1}>
              <StatCard {...item} />
            </Box>
          ))}
        </Box>

        {/* Rows 2 & 3 */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={4}>
          {/* Left Column */}
          <Box flex={0.5} display="flex" flexDirection="column" gap={2}>
            <Box flex={1}>
              <StatCard {...summaryData.find(d => d.title.includes('Top 3 Programs'))} />
            </Box>
            <Box flex={2}>
              <PieChartCard
                title="Gender Distribution"
                data={genderData}
                totalLabel="2.5K"
                subtitle={`as of ${todayFormatted}`}
              />
            </Box>
          </Box>

          {/* Right Column */}
          <Box flex={1} display="flex">
            <GroupedBarChart
              title="Population by Year Level"
              data={yearLevelData}
              keys={['First Year', 'Second Year', 'Third Year', 'Fourth Year']}
              xKey="name"
              subtitle={`as of ${todayFormatted}`}
            />
          </Box>
        </Box>


        {/* Final Row: Region and Age Group side by side */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          <Box flex={1}>
            <GroupedBarChart
              title="Students by Region"
              data={regionData}
              keys={['Students']}
              xKey="name"
              subtitle={`as of ${todayFormatted}`}
            />
          </Box>
          <Box flex={1}>
            <GroupedBarChart
              title="Students by Age Group"
              data={ageData}
              keys={['Students']}
              xKey="name"
              subtitle={`as of ${todayFormatted}`}
            />
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default AdminReports;