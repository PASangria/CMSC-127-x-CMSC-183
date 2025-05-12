import React from "react";
import "../components/css/DashboardTable.css";
import { formatDate } from "../utils/helperFunctions";

const TableSection = ({ title, headers, rows, onView }) => {
  // Check if rows is an array and default to an empty array if not
  const validRows = Array.isArray(rows) ? rows : [];

  return (
    <div className="table-section">
      <h2>{title}</h2>
      {validRows.length === 0 ? (
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
            {validRows.map((row, idx) => (
              <tr key={row.id}> {/* Use a unique ID from the form */}
                {/* Access individual properties of the row */}
                <td>{row.form_type}</td> {/* Example: formType could be a property */}
                <td><span>{formatDate(row.date_submitted || row.saved_on)}</span></td> 
                <td>
                  <span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                </td>
                <td>
                  <button className="view-button" onClick={() => onView(row)}>VIEW</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const DashboardTable = ({ submittedForms, pendingActions, onView }) => {
  const submittedHeaders = ["Form Type", "Date Submitted", "Status"];
  const pendingHeaders = ["Form Type", "Last Date Updated", "Status"];

  console.log("Submitted Forms:", submittedForms);
  console.log("Pending Actions:", pendingActions);

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
