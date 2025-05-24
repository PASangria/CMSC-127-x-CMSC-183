import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

import DefaultLayout from "../components/DefaultLayout";
import StatCard from "../components/StatCard1";
import PieChartCard from "../components/PieChartCard";
import GroupedBarChart from "../components/GroupedBarChart";
import { apiRequest } from "../utils/apiUtils";

export const AdminReports = () => {
  const { user, loading } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await apiRequest(
          "http://localhost:8000/api/dashboard/admin-reports/"
        );
        if (!res.ok) throw new Error("Failed to fetch report data");
        const data = await res.json();
        setReportData(data);
        console.log(data);
      } catch (err) {
        console.error("Error loading report data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading || isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (!user) return <Navigate to="/" replace />;
  if (!reportData) return <Typography>Error loading reports.</Typography>;

  const {
    summaryData = [],
    genderData = [],
    yearLevelData = [],
    regionData = [],
    ageData = [],
  } = reportData;
  const totalNumberofStudents = summaryData.find((d) => d.title === "Total Number of Students")?.value
  console.log(totalNumberofStudents);
  const top3ProgramsCard = summaryData.find((item) =>
    item.title.includes("Top 3 Programs")
  );

  return (
    <DefaultLayout variant="admin">
      <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 3, md: 5 } }}>
        <Typography variant="h5" mb={3}>
          Administrative Reports
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          mb={4}
        >
          {summaryData.slice(0, 4).map((item, idx) => (
            <Box key={idx} flex={1}>
              <StatCard {...item} />
            </Box>
          ))}
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          mb={4}
        >
          <Box flex={0.5} display="flex" flexDirection="column" gap={2}>
            <Box flex={1}>
              <StatCard {...top3ProgramsCard} />
            </Box>
            <Box flex={2}>
              <PieChartCard
                title="Gender Distribution"
                data={genderData}
                totalLabel={
                  summaryData.find(
                    (d) => d.title === "Total Number of  Students"
                  )?.value
                }
                subtitle={top3ProgramsCard?.interval}
              />
            </Box>
          </Box>

          <Box flex={1} display="flex">
            <GroupedBarChart
              title="Population by Year Level"
              data={yearLevelData}
              keys={["First Year", "Second Year", "Third Year", "Fourth Year"]}
              totalValue={totalNumberofStudents}
              xKey="name"
              subtitle={top3ProgramsCard?.interval}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
          <Box flex={1}>
            <GroupedBarChart
              title="Students by Region"
              data={regionData}
              keys={["Students"]}
              totalValue={totalNumberofStudents}
              xKey="name"
              subtitle={top3ProgramsCard?.interval}
            />
          </Box>
          <Box flex={1}>
            <GroupedBarChart
              title="Students by Age Group"
              data={ageData}
              keys={["Students"]}
              xKey="name"
              totalValue={totalNumberofStudents}
              subtitle={top3ProgramsCard?.interval}
            />
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default AdminReports;
