import React, { useState } from 'react';
import DashboardTable from '../components/DashboardTable';
<<<<<<< Updated upstream
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';  // Import the useAuth hook
import { useApiRequest } from '../context/ApiRequestContext';  // Import the useApiRequest hook
import './css/userDashboard.css'

export const UserDashboard = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();  // Access auth context
  const { request } = useApiRequest();  // Access apiRequest function
  const [submittedForms, setSubmittedForms] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

  const fetchSubmittedForms = async () => {
    try {
      // Make the API request for the logged-in user's submissions
      const response = await request('http://localhost:8000/api/forms/display/submissions/');
      if (response) {
        const data = await response.json();
        
        const submitted = data.filter(form => form.status === 'submitted');
        const pending = data.filter(form => form.status === 'draft');

        // Update the states with the filtered data
        setSubmittedForms(submitted);  // For submitted forms
        setPendingActions(pending);    // For pending actions
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);  // Set loading to false after data is fetched
    }
  };


    // Fetch the data if user is authenticated
    if (isAuthenticated) {
      fetchSubmittedForms();
    }
  }, [isAuthenticated, request, navigate]);  // Dependency on `isAuthenticated` and `request`

  if (authLoading || loading) {
    return <Loader />;  // Show loader if data or auth state is still loading
  }

  return (
    <div className="profile-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className="profile-container">
            <div className="fade-in-up" style={{ flex: 1, padding: '20px', minWidth: 0 }}>
              <DashboardTable
                submittedForms={submittedForms}
                pendingActions={pendingActions}  // Optionally handle pending actions similarly
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
=======
import DefaultLayout from '../components/DefaultLayout';

export const UserDashboard = () => {
  const [submittedForms, setSubmittedForms] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);

  return (
    <DefaultLayout variant="student">
      <DashboardTable
        submittedForms={submittedForms}
        pendingActions={pendingActions}
      />
    </DefaultLayout>
>>>>>>> Stashed changes
  );
};
