import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import DashboardTable from '../components/DashboardTable';
import Loader from '../components/Loader';

export const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [submittedForms, setSubmittedForms] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/profile/', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);

        const submitted = data.submitted_forms?.map((form) => [
          form.type,
          form.date_submitted,
          form.status,
        ]) || [];

        const pending = data.pending_actions?.map((form) => [
          form.type,
          form.last_updated,
          form.status,
        ]) || [];

        setSubmittedForms(submitted);
        setPendingActions(pending);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('You are not authenticated. Redirecting to the home page...');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      });
  }, []); 


  // just remove the (/**/) if you want to see the data table;
  /*useEffect(() => {
    //Use mock data for development
    fetch('/mock-profile.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load mock profile data');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
  
        const submitted = data.submitted_forms?.map((form) => [
          form[0], form[1], form[2]
        ]) || [];
  
        const pending = data.pending_actions?.map((form) => [
          form[0], form[1], form[2]
        ]) || [];
  
        setSubmittedForms(submitted);
        setPendingActions(pending);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load mock data.');
      });
  }, []); */

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <SideNav_student />
        <div style={{ flex: 1, padding: '20px', minWidth: 0 }}>
          <DashboardTable
            submittedForms={submittedForms}
            pendingActions={pendingActions}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};