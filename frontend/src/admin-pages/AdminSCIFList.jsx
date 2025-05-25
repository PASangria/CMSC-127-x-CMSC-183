import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../context/ApiRequestContext";
import { useAuth } from "../context/AuthContext";
import DefaultLayout from "../components/DefaultLayout";
import Button from "../components/UIButton";
import { Box, Typography, Pagination } from "@mui/material";
import StudentFilterBar from "../components/StudentFilterBar";
import PaginationControls from "../components/PaginationControls";
import { formatDate } from "../utils/helperFunctions";
import "./css/studentList.css";
import SortableTableHeader from "../components/SortableTableHeader";
import Loader from "../components/Loader";

export const AdminSCIFList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading } = useAuth();

  // raw + filtered submissions
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // filtering state
  const [filterText, setFilterText] = useState("");
  const [years, setYears] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const handleResetFilters = () => {
    setFilterText("");
    setYears([]);
    setPrograms([]);
    setSelectedDate("");
  };

  // sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (e, value) => setCurrentPage(value);

  // fetch all SCIF submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request(
          "/api/forms/admin/student-cumulative-information-file-submissions"
        );
        if (!res.ok) throw new Error("Failed to fetch SCIF submissions");
        const data = await res.json();
        data.sort(
          (a, b) => new Date(b.submitted_on) - new Date(a.submitted_on)
        );
        setSubmissions(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoadingData(false);
      }
    };
    if (!loading && role === "admin") fetchData();
  }, [loading, role, request]);

  // apply filters
  useEffect(() => {
    const temp = submissions.filter(({ student, submitted_on }) => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      if (filterText && !fullName.includes(filterText.toLowerCase())) return false;
      if (years.length && !years.includes(student.current_year_level)) return false;
      if (programs.length && !programs.includes(student.degree_program)) return false;
      if (selectedDate) {
        const d = new Date(submitted_on).toISOString().split("T")[0];
        if (d !== selectedDate) return false;
      }
      return true;
    });
    setFiltered(temp);
    setCurrentPage(1);
  }, [filterText, years, programs, selectedDate, submissions]);

  if (loading || loadingData) return <Loader />;
  if (role !== "admin")       return <div>Access denied. Admins only.</div>;
  if (error)                   return <div>{error}</div>;

  // pagination math
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentSlice = filtered.slice(startIdx, startIdx + itemsPerPage);

  // filter dropdown options
  const yearOptions = Array.from(
    new Set(submissions.map((s) => s.student.current_year_level))
  );
  const programOptions = Array.from(
    new Set(submissions.map((s) => s.student.degree_program))
  );

  const handleViewStudent = (student) => {
    navigate(
      `/admin/student-forms/${student.student_number}/student-cumulative-information-file/`
    );
  };

  return (
    <DefaultLayout variant="admin">
      <Box className="admin-student-list" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Cumulative Information File Submissions
        </Typography>

        {/* Filters */}
        <StudentFilterBar
          filterText={filterText}
          setFilterText={setFilterText}
          years={years}
          setYears={setYears}
          yearOptions={yearOptions}
          programs={programs}
          setPrograms={setPrograms}
          programOptions={programOptions}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onReset={handleResetFilters}
        />

        {/* Table */}
        <table>
          <thead>
            <tr>
              <SortableTableHeader
                label="Student Name"
                sortKey="name"
                currentSort={sortConfig}
                onSort={handleSort}
              />
              <SortableTableHeader
                label="Date Submitted"
                sortKey="date"
                currentSort={sortConfig}
                onSort={handleSort}
              />
              <SortableTableHeader
                label="Year – Degree Program"
                sortKey="yearProgram"
                currentSort={sortConfig}
                onSort={handleSort}
              />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSlice.length > 0 ? (
              currentSlice.map(({ student, submitted_on }) => (
                <tr key={student.student_number}>
                  <td data-label="Student Name">
                    {student.first_name} {student.last_name}
                  </td>
                  <td data-label="Date Submitted">
                    {formatDate(submitted_on)}
                  </td>
                  <td data-label="Year – Degree Program">
                    {student.current_year_level} – {student.degree_program}
                  </td>
                  <td data-label="Actions">
                    <Button
                      variant="secondary"
                      onClick={() => handleViewStudent(student)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No submissions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationControls
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </DefaultLayout>
  );
};