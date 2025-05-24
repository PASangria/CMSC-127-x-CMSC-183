import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../context/ApiRequestContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/UIButton";
import DefaultLayout from "../components/DefaultLayout";
import "./css/studentList.css";
import { formatDate } from "../utils/helperFunctions";
import {
  Box,
  Typography,
  Pagination,
} from "@mui/material";
import StudentFilterBar from "../components/StudentFilterBar";
import PaginationButtons from "../components/PaginationControls";

export const AdminBISList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading } = useAuth();

  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const [filterText, setFilterText] = useState("");
  const [years, setYears] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const yearOptions = Array.from(
    new Set(submissions.map((s) => s.student.current_year_level))
  );
  const programOptions = Array.from(
    new Set(submissions.map((s) => s.student.degree_program))
  );

  const handleResetFilters = () => {
    setFilterText("");
    setYears([]);
    setPrograms([]);
    setSelectedDate("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request(
          "/api/forms/admin/basic-information-sheet-submissions"
        );
        if (res.ok) {
          const data = await res.json();
          data.sort(
            (a, b) => new Date(b.submitted_on) - new Date(a.submitted_on)
          );
          setSubmissions(data);
          setFiltered(data);
        } else {
          throw new Error("Failed to fetch BIS students");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading && role === "admin") {
      fetchData();
    }
  }, [loading, role, request]);

  useEffect(() => {
    let temp = submissions.filter(({ student, submitted_on }) => {
      const fullName =
        `${student.first_name} ${student.last_name}`.toLowerCase();
      if (filterText && !fullName.includes(filterText.toLowerCase()))
        return false;
      if (years.length > 0 && !years.includes(student.current_year_level))
        return false;
      if (
        programs.length > 0 &&
        !programs.includes(student.degree_program)
      )
        return false;
      if (selectedDate) {
        const submissionDate = new Date(submitted_on)
          .toISOString()
          .split("T")[0];
        if (submissionDate !== selectedDate) return false;
      }
      return true;
    });
    setFiltered(temp);
    setCurrentPage(1);
  }, [filterText, years, programs, selectedDate, submissions]);

  // Calculate pagination values
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleViewStudent = (student) => {
    navigate(
      `/admin/student-forms/${student.student_number}/basic-information-sheet/`
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loadingData || loading) return <div>Loading...</div>;
  if (role !== "admin") return <div>Access denied. Admins only.</div>;
  if (error) return <div>{error}</div>;

  return (
    <DefaultLayout variant="admin">
      <Box className="admin-student-list" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Basic Information Sheet Submissions
        </Typography>

        {/* Filters Bar */}
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

        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date Submitted</th>
              <th>Year – Degree Program</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map(({ student, submitted_on }) => (
                <tr key={student.student_number}>
                  <td>
                    {student.first_name} {student.last_name}
                  </td>
                  <td>{formatDate(submitted_on)}</td>
                  <td>
                    {student.current_year_level} – {student.degree_program}
                  </td>
                  <td>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <PaginationButtons
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
      </Box>
    </DefaultLayout>
  );
};
