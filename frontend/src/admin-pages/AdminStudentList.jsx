import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../components/SideNav_admin'
import SideNav_admin from '../components/SideNav_admin';
import { useApiRequest } from '../context/ApiRequestContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UIButton';
import "./css/studentList.css"
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';

export const AdminStudentList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading, isAuthenticated, User } = useAuth();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!loading && role === 'admin') {
        const res = await request('http://localhost:8000/api/forms/admin/students/');
        if (res && res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          console.error("Failed to fetch students");
        }
      }
    };

    fetchStudents();
  }, [role, loading]);

  if (loading) return <div>Loading...</div>;
  if (role !== 'admin') return <div>Access denied. Admins only.</div>;

  const handleViewStudent = (student) => {
    navigate(`/admin/students/${student.student_number}`);
  };
    return (
  <div>
    <DefaultLayout variant='admin'>
    <div className='admin-student-list'>
    <h1>Student List</h1>
    <table>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Year-Degree Program</th>
          <th>UP Mail</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.student_number}>
            <td data-label="Student Name">{student.first_name} {student.last_name}</td>
            <td data-label="Year-Degree Program">{student.current_year_level}-{student.degree_program}</td>
            <td data-label="UP Mail">{student.email}</td>
            <td data-label="Actions">
              <Button variant="secondary" onClick={() => handleViewStudent(student)}>
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </DefaultLayout>
  </div>
);
};