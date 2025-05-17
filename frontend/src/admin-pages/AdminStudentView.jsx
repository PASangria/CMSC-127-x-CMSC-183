import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiRequest } from '../context/ApiRequestContext';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import StudentSideInfo from '../student-pages/IndividualStudent';
import DefaultLayout from '../components/DefaultLayout';

export const AdminStudentView = () => {
  const { studentId } = useParams();
  const { request } = useApiRequest();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await request(`http://localhost:8000/api/forms/admin/students/${studentId}/`);
      if (res && res.ok) {
        const data = await res.json();
        setStudent(data);
      } else {
        console.error("Failed to fetch student");
      }
    };

    fetchStudent();
  }, [studentId]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
        <DefaultLayout variant='admin'>
          <StudentSideInfo profileData={student} />
        </DefaultLayout>
    </div>
  );
};
