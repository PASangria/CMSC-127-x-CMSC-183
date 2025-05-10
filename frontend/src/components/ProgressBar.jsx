import React from 'react';
import './css/ProgressBar.css'; // Importing the CSS file

const ProgressBar = ({ currentStep, totalSteps = 5 }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        {steps.map(step => (
          <div
            key={step}
            className={`ellipse ${step <= currentStep ? 'filled' : ''}`}
          />
        ))}
      </div>
      <div className="border" />
    </div>
  );
};

export default ProgressBar;
