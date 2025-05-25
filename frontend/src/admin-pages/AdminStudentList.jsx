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
import Loader from '../components/Loader';

export const AdminStudentList = () => {
  const navigate = useNavigate();
  const { request } = useApiRequest();
  const { role, loading, isAuthenticated, User } = useAuth();
  const [students, setStudents] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const res = await request("http://localhost:8000/api/forms/admin/students/");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();

       data.sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );

      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching student data. Please try again.");
    } finally {
      setLoadingData(false);
    }
  };

  if (!loading && role === "admin") fetchStudents();
}, [loading, role, request]);


  if (loading || loadingData) return <Loader />;
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