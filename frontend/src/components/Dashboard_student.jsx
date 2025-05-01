import React from 'react';
import SideNav_student from './SideNav_student'; // Ensure this path and component are correct
import DataTable from './DataTable';
import './css/Dashboard_student.css';

const Dashboard = () => {
  const user = {
    name: 'Quennie Nebria',
    email: 'qneb@up.edu.ph',
  };

  const submittedForms = [
    { formType: 'Form A', dateSubmitted: '2025-04-01', status: 'Approved' },
    { formType: 'Form B', dateSubmitted: '2025-04-02', status: 'Pending' },
    { formType: 'Form C', dateSubmitted: '2025-04-03', status: 'Rejected' },
  ];

  const pendingActions = [
    { formType: 'Form D', dateSubmitted: '2025-04-04', status: 'Pending' },
    { formType: 'Form E', dateSubmitted: '2025-04-05', status: 'Pending' },
  ];

  return (
    <div className="dashboard-container">
      <SideNav_student user={user} /> {/* Pass the user object to SideNav_student */}
      <div className="dashboard-content">
        <h1>Welcome, {user.name}</h1>
        <h2>Your Submitted Forms</h2>
        <DataTable data={submittedForms} /> {/* Pass the submitted forms data to DataTable */}
        <h2>Pending Actions</h2>
        <DataTable data={pendingActions} /> {/* Pass the pending actions data to DataTable */}
      </div>
    </div>
  );
};

export default Dashboard;