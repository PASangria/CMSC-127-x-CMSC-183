import React from 'react';
import './css/ConfirmDialog.css';

const ConfirmDialog = ({
  title = 'Are you sure?',
  message = 'Please confirm your action.',
  onConfirm,
  onCancel,
  confirmLabel = 'Yes',
  cancelLabel = 'Cancel',
}) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="confirm-btn" onClick={onConfirm}>{confirmLabel}</button>
          <button className="cancel-btn" onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
