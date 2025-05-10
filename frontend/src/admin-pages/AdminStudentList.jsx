import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../components/SideNav_admin'
import SideNav_admin from '../components/SideNav_admin';
import { useApiRequest } from '../context/ApiRequestContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UIButton';

export const AdminStudentList = () => {

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


    return (
    <div>
      <Navbar />
      <SideNav_admin />
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
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.current_year_level}-{student.degree_program}</td>
              <td>{student.email}</td>
              <td>
                 <Button variant="secondary" onClick={() => handleViewStudent(student)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default AdminStudentList;