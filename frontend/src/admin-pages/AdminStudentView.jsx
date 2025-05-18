import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiRequest } from '../context/ApiRequestContext';
import StudentSideInfo from '../student-pages/IndividualStudent';
import DefaultLayout from '../components/DefaultLayout';

export const AdminStudentView = () => {
  const { studentId } = useParams(); // Getting studentId from URL params
  const { request } = useApiRequest(); // Getting the request function from context
  const [student, setStudent] = useState(null); // State for storing student data
  const [submittedForms, setSubmittedForms] = useState({}); // State for submitted forms, now an object
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log(studentId);

        // Fetching student data
        const res = await request(`http://localhost:8000/api/forms/admin/students/${studentId}/`);

        if (res.ok) {
          const data = await res.json();
          setStudent(data);

          // Fetching all form submissions for this student
          const formRes = await request(`http://localhost:8000/api/forms/admin/student-forms/${studentId}/`);
          if (formRes.ok) {
            const forms = await formRes.json();
            setSubmittedForms(forms); 
            console.log(forms); 
          } else {
            console.error("Failed to fetch form submissions");
            setError('Failed to fetch form submissions.');
          }
        } else {
          console.error("Failed to fetch student data");
          setError('Failed to fetch student data.');
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError('Error fetching student data. Please try again.');
      } finally {
        setLoading(false); 
      }
    };

    fetchStudent();
  }, [studentId, request]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <DefaultLayout variant="admin">
        <StudentSideInfo profileData={student} submittedForms={submittedForms} />
      </DefaultLayout>
    </div>
  );
};
