import React, { useEffect, useState } from 'react';
import { useApiRequest } from '../context/ApiRequestContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UIButton';
import DefaultLayout from '../components/DefaultLayout';
import "./css/studentList.css";
import { formatDate } from '../utils/helperFunctions';
import { AlignCenter } from 'react-feather';

export const AdminSCIFList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading, isAuthenticated } = useAuth();

  const [submissions, setSubmissions] = useState([]);  
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request('http://localhost:8000/api/forms/admin/student-cumulative-information-file-submissions');
        
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data);
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

  if (loadingData) return <div>Loading...</div>;
  if (loading) return <div>Loading...</div>;
  if (role !== 'admin') return <div>Access denied. Admins only.</div>;
  if (error) return <div>{error}</div>;

  const handleViewStudent = (student) => {
    navigate(`/admin/students/${student.student_number}`);
  };

  return (
    <div>
      <DefaultLayout variant="admin">
        <div className="admin-student-list">
          <h1>Basic Information Sheet</h1>
          <h2 style={{textAlign: "center"}}>Submissions</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Date Submitted</th>
                <th>Year - Degree Program</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map(submission => {
                  const student = submission.student;
                  return (
                    <tr key={student.student_number}>
                      <td data-label="Student Name">{student.first_name} {student.last_name}</td>
                      <td data-label="Date Submitted">{formatDate(submission.submitted_on)}</td>
                      <td data-label="Year-Degree Program">{student.current_year_level} - {student.degree_program}</td>
                      <td data-label="Actions">
                        <Button variant="secondary" onClick={() => handleViewStudent(student)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No Basic Information Sheet submissions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DefaultLayout>
    </div>
  );
};
