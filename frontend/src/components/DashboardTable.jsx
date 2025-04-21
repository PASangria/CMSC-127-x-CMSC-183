import React from "react";
import "../components/css/DashboardTable.css";

const TableSection = ({ title, headers, rows }) => (
  <div className="table-section">
    <h2>{title}</h2>
    {rows.length === 0 ? (
      <p>No {title.toLowerCase()} yet.</p>
    ) : (
      <table className="dashboard-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, i) => (
              <td key={i}>
                {i === 2? (
                  <span className={`status-badge ${cell.toLowerCase()}`}>{cell}</span>
                ) : (
                  cell
                )}
              </td>
            ))}
            <td>
              <button className="view-button" onClick={() => handleView(row)}>VIEW</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    )}
  </div>
);

const DashboardTable = ({ submittedForms, pendingActions, onView }) => {
  const submittedHeaders = ["Form Type", "Date Submitted", "Status"];
  const pendingHeaders = ["Form Type", "Last Date Updated", "Status"];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <TableSection
        title="Submitted Forms"
        headers={submittedHeaders}
        rows={submittedForms}
        onView={onView}
      />
      <TableSection
        title="Pending Actions"
        headers={pendingHeaders}
        rows={pendingActions}
        onView={onView}
      />
    </div>
  );
};

export default DashboardTable;

// To improve:  
// key usage for rows.map:
// {rows.map((row, idx) => (             --> line 21
//  <tr key={idx}></tr>
// Using index as a key works, but ideally use a unique ID from the form object if available (like form.id).

// define handleView(row) (or pass it as a prop). --> line 32 in the button
// make the "VIEW" button open a modal or route to a detailed page.