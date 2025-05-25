import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiRequest } from '../context/ApiRequestContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UIButton';
import DefaultLayout from '../components/DefaultLayout';
import "./css/studentList.css";
import { formatDate } from '../utils/helperFunctions';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Stack,
  Box,
  Typography
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StudentFilterBar from '../components/StudentFilterBar';

export const AdminBISList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading } = useAuth();

  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const [filterText, setFilterText] = useState('');
  const [years, setYears] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const yearOptions = Array.from(new Set(submissions.map(s => s.student.current_year_level)));
  const programOptions = Array.from(new Set(submissions.map(s => s.student.degree_program)));

  const handleResetFilters = () => {
    setFilterText('');
    setYears([]);
    setPrograms([]);
    setSelectedDate('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request('/api/forms/admin/basic-information-sheet-submissions');
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data);
          setFiltered(data);
        } else {
          throw new Error('Failed to fetch BIS students');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading && role === 'admin') {
      fetchData();
    }
  }, [loading, role, request]);

  useEffect(() => {
    let temp = submissions.filter(({ student, submitted_on }) => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      if (filterText && !fullName.includes(filterText.toLowerCase())) return false;
      if (years.length > 0 && !years.includes(student.current_year_level)) return false;
      if (programs.length > 0 && !programs.includes(student.degree_program)) return false;
      if (selectedDate) {
        const submissionDate = new Date(submitted_on).toISOString().split('T')[0];
        if (submissionDate !== selectedDate) return false;
      }
      return true;
    });
    setFiltered(temp);
    setCurrentPage(1); // Reset page on filters change
  }, [filterText, years, programs, selectedDate, submissions]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleViewStudent = (student) => {
    navigate(`/admin/student-forms/${student.student_number}/basic-information-sheet/`);
  };

  if (loadingData || loading) return <div>Loading...</div>;
  if (role !== 'admin') return <div>Access denied. Admins only.</div>;
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end" sx={{ mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            size="small"
            sx={{
              flex: { xs: '1 1 100%', sm: '2 1 0%' },
              minWidth: '200px',
              maxWidth: '500px',
              '& .MuiInputBase-root': { height: 40 },
              '& .MuiInputLabel-root': { top: '-6px', left: '0px' },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 200, maxWidth: 300 }}>
            <InputLabel id="year-level-label">Year Level</InputLabel>
            <Select
              labelId="year-level-label"
              multiple
              value={years}
              onChange={(e) => setYears(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
              sx={{ height: 40 }}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  <Checkbox checked={years.includes(year)} />
                  <ListItemText primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200, maxWidth: 300 }}>
            <InputLabel id="program-label">Degree Program</InputLabel>
            <Select
              labelId="program-label"
              multiple
              value={programs}
              onChange={(e) => setPrograms(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
              sx={{ height: 40 }}
            >
              {programOptions.map((prog) => (
                <MenuItem key={prog} value={prog}>
                  <Checkbox checked={programs.includes(prog)} />
                  <ListItemText primary={prog} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Submitted"
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={(newValue) => {
                setSelectedDate(newValue ? newValue.toISOString().split('T')[0] : '');
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: {
                    minWidth: 200,
                    '& .MuiInputBase-root': { height: 40 },
                    '& .MuiInputLabel-root': { top: '-6px', left: '0px' }
                  }
                }
              }}
            />
          </LocalizationProvider>

          <Button variant="outlined" onClick={handleResetFilters} sx={{ height: 40 }}>
            Reset Filters
          </Button>
        </Stack>

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
                  <td>{student.first_name} {student.last_name}</td>
                  <td>{formatDate(submitted_on)}</td>
                  <td>{student.current_year_level} – {student.degree_program}</td>
                  <td>
                    <Button variant="secondary" onClick={() => handleViewStudent(student)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No submissions match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "outlined"}
              onClick={() => setCurrentPage(page)}
              sx={{ mx: 0.5 }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Box>
    </DefaultLayout>
  );
};
