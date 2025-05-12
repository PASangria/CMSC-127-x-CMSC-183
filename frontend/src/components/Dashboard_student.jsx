import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav_student from './SideNav_student'; // Ensure this path and component are correct
import DashboardTable from './DashboardTable'; // Import the DashboardTable component
import Loader from '../components/Loader'; // Assuming you have a Loader component for loading states
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext provides user data
import { apiRequest } from '../utils/apiUtils'; // Importing apiRequest for API calls
import './css/Dashboard_student.css';

const Dashboard = () => {
  const [submittedForms, setSubmittedForms] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const { user, loading } = useContext(AuthContext); // Access the user from AuthContext
  const navigate = useNavigate(); // For navigation purposes


  useEffect(() => {
    if (!user) {
      return; // If the user is not authenticated, do nothing
    }

    const fetchForms = async () => {
      try {
        // API request to get all submissions for the logged-in user
        const response = await apiRequest('http://localhost:8000/api/submissions/');

        if (response.ok) {
          const data = await response.json();

          // Filter forms based on their status
          const submitted = data.filter((form) => form.status === 'submitted');
          const pending = data.filter((form) => form.status === 'draft');

          setSubmittedForms(submitted); // Set the submitted forms
          setPendingActions(pending); // Set the pending actions
        } else {
          console.error('Failed to fetch submissions');
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchForms();
  }, [user]);

  const handleView = (form) => {
    navigate(`/forms/${form.id}`);
  };

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="dashboard-container">
      <SideNav_student user={user} /> {/* Pass the user object to SideNav_student */}
      <div className="dashboard-content">
        <h1>Welcome, {user.name}</h1>
        
        {/* Pass the submitted and pending actions data to DashboardTable */}
        <DashboardTable 
          submittedForms={submittedForms} 
          pendingActions={pendingActions} 
          onView={handleView}
        />
      </div>
    </div>
  );
};

export default Dashboard;
