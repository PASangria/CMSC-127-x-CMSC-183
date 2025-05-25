import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiRequest } from '../context/ApiRequestContext';
import StudentSideInfo from '../student-pages/IndividualStudent';
import DefaultLayout from '../components/DefaultLayout';
import Loader from '../components/Loader';

export const AdminStudentView = () => {
  const { studentId } = useParams();
  const { request } = useApiRequest(); 
  const [student, setStudent] = useState(null);
  const [submittedForms, setSubmittedForms] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log(studentId);

        const res = await request(`http://localhost:8000/api/forms/admin/students/${studentId}/`);

        if (res.ok) {
          const data = await res.json();
          setStudent(data);

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

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <DefaultLayout variant="admin">
        <StudentSideInfo profileData={student} submittedForms={submittedForms} isAdmin={true}/>
      </DefaultLayout>
    </div>
  );
};
