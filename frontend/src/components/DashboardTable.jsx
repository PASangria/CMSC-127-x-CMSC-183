import React from "react";
import "../components/css/DashboardTable.css";
import Button from "./UIButton";
import { formatDate } from "../utils/helperFunctions";

const TableSection = ({ title, headers, rows, onView, onDelete }) => {
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {validRows.map((row) => (
              <tr key={row.id}>
                <td>{row.form_type}</td>
                <td><span>{formatDate(row.date_submitted || row.saved_on)}</span></td>
                <td>
                  <span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                </td>
                <td>
                  {onView && (
                    <Button variant="primary" onClick={() => onView(row)}>View</Button>
                  )}
                  {onDelete && (
                    <Button variant="danger" onClick={() => onDelete(row)} style={{ marginLeft: '8px' }}>
                      Delete
                  </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


const DashboardTable = ({ submittedForms, pendingActions, onView, onDelete }) => {
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
        onDelete={onDelete}
      />
    </div>
  );
};



export default DashboardTable;
