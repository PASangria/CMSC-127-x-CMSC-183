import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTable from '../components/DashboardTable';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useApiRequest } from '../context/ApiRequestContext';
import DefaultLayout from '../components/DefaultLayout';
import './css/userDashboard.css';

export const UserDashboard = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { request } = useApiRequest();
  const [submittedForms, setSubmittedForms] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchSubmittedForms = async () => {
      try {
        const response = await request('http://localhost:8000/api/forms/display/submissions/');
        if (response) {
          const data = await response.json();
          const submitted = data.filter(form => form.status === 'submitted');
          const pending = data.filter(form => form.status === 'draft');

          setSubmittedForms(submitted);
          setPendingActions(pending);
        }
      } catch (err) {
        console.error('Error fetching submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedForms();
  }, [isAuthenticated, request, navigate]);

  if (authLoading || loading) {
    return <Loader />;
  }

  return (
    <DefaultLayout variant="student">
      <DashboardTable
        submittedForms={submittedForms}
        pendingActions={pendingActions}
      />
    </DefaultLayout>
  );
};
