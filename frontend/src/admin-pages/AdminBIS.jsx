import React, { useEffect, useState } from 'react';
import { useApiRequest } from '../context/ApiRequestContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

export const AdminBISList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading } = useAuth();

  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // filter states
  const [filterText, setFilterText] = useState('');
  const [years, setYears] = useState([]);
  const [programs, setPrograms] = useState([]);

  // **New date filter state**
  const [selectedDate, setSelectedDate] = useState('');

  // extract unique choices from data
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
    fetchData();
  }, [request]);

  // apply filters including date filter
  useEffect(() => {
    let temp = submissions.filter(({ student, submitted_on }) => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();

      // text match
      if (filterText && !fullName.includes(filterText.toLowerCase())) {
        return false;
      }
      // year filter
      if (years.length > 0 && !years.includes(student.current_year_level)) {
        return false;
      }
      // program filter
      if (programs.length > 0 && !programs.includes(student.degree_program)) {
        return false;
      }
      // **date filter** - match exact yyyy-MM-dd format
      if (selectedDate) {
        const submissionDate = new Date(submitted_on).toISOString().split('T')[0];
        if (submissionDate !== selectedDate) {
          return false;
        }
      }
      return true;
    });
    setFiltered(temp);
  }, [filterText, years, programs, selectedDate, submissions]);

  if (loadingData || loading) return <div>Loading...</div>;
  if (role !== 'admin') return <div>Access denied. Admins only.</div>;
  if (error) return <div>{error}</div>;

  const handleViewStudent = (student) =>
    navigate(`/admin/students/${student.student_number}`);

  return (
    <DefaultLayout variant="admin">
      <Box className="admin-student-list" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Basic Information Sheet Submissions
        </Typography>

        {/* Filters Bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="flex-end"
          sx={{
            mb: 2,
            flexWrap: { xs: 'wrap', sm: 'nowrap' }, // allow wrap on xs
          }}
        >
          {/* Search TextField */}
          <TextField
            label="Search by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            size="small"
            aria-label="Search by student name"
            sx={{
              flex: { xs: '1 1 100%', sm: '2 1 0%' }, // full width on xs, 2 flex units on sm+
              minWidth: { xs: '100%', sm: '250px' },
              maxWidth: '500px',
              '& .MuiInputBase-root': {
                height: 40,
              },
              '& .MuiInputLabel-root': {
                top: '-6px',
                left: '0px',
              },
            }}
          />

          {/* Year Level Select */}
          <FormControl
            size="small"
            sx={{
              minWidth: 200,
              flex: { xs: '1 1 48%', sm: '1 1 0%' }, // half width on xs for two-column look
              maxWidth: 300,
            }}
          >
            <InputLabel
              id="year-level-label"
              sx={{ top: '-6px', left: '0px' }}
            >
              Year Level
            </InputLabel>
            <Select
              labelId="year-level-label"
              label="Year Level"
              multiple
              value={years}
              onChange={(e) => {
                const value = e.target.value;
                setYears(typeof value === 'string' ? value.split(',') : value);
              }}
              renderValue={(selected) => selected.join(', ')}
              sx={{ height: 40, display: 'flex', alignItems: 'center' }}
              aria-labelledby="year-level-label"
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  <Checkbox checked={years.includes(year)} />
                  <ListItemText primary={year} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Degree Program Select */}
          <FormControl
            size="small"
            sx={{
              minWidth: 200,
              flex: { xs: '1 1 48%', sm: '1 1 0%' },
              maxWidth: 300,
            }}
          >
            <InputLabel
              id="program-label"
              sx={{ top: '-6px', left: '0px' }}
            >
              Degree Program
            </InputLabel>
            <Select
              labelId="program-label"
              label="Degree Program"
              multiple
              value={programs}
              onChange={(e) => {
                const value = e.target.value;
                setPrograms(typeof value === 'string' ? value.split(',') : value);
              }}
              renderValue={(selected) => selected.join(', ')}
              sx={{ height: 40, display: 'flex', alignItems: 'center' }}
              aria-labelledby="program-label"
            >
              {programOptions.map((prog) => (
                <MenuItem key={prog} value={prog}>
                  <Checkbox checked={programs.includes(prog)} />
                  <ListItemText primary={prog} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl
              size="small"
              sx={{
                minWidth: 200,
                flex: { xs: '1 1 100%', sm: '1 1 0%' },
                maxWidth: 300,
              }}
            >
              <DatePicker
                label="Date Submitted"
                value={selectedDate ? new Date(selectedDate) : null}
                onChange={(newValue) => {
                  if (newValue) {
                    const formattedDate = newValue.toISOString().split('T')[0];
                    setSelectedDate(formattedDate);
                  } else {
                    setSelectedDate('');
                  }
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      '& .MuiInputBase-root': {
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                      },
                      '& .MuiInputLabel-root': {
                        top: '-6px',
                        left: '0px',
                      },
                      '& .MuiInputAdornment-root button': {
                        backgroundColor: 'transparent',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                        '& svg': {
                          color: 'black',
                        },
                      },
                    },
                    'aria-label': 'Filter by date submitted',
                  },
                }}
              />
            </FormControl>
          </LocalizationProvider>

          {/* Reset Filters Button */}
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            sx={{ height: 40, whiteSpace: 'nowrap', flexShrink: 0 }}
            aria-label="Reset all filters"
          >
            Reset Filters
          </Button>
        </Stack>


        {/* Table */}
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
            {filtered.length > 0 ? (
              filtered.map((submission) => {
                const { student, submitted_on } = submission;
                return (
                  <tr key={student.student_number}>
                    <td data-label="Student Name">
                      {student.first_name} {student.last_name}
                    </td>
                    <td data-label="Date Submitted">
                      {formatDate(submitted_on)}
                    </td>
                    <td data-label="Year–Program">
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
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No submissions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>
    </DefaultLayout>
  );
};
