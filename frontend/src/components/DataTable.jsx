import React from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <p>No data available</p>; // Handle cases where data is undefined or not an array
  }

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Form Type</th>
            <th>Date Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.formType}</td>
              <td>{row.dateSubmitted}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;