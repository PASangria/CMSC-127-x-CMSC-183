import React from 'react';
import '../SetupProfile/css/multistep.css';

const SCIFPreviousSchoolRecord = ({ data, updateData }) => {
  const handleSchoolChange = (level, index, field, value) => {
    const updatedSchools = { ...data.previousSchools };
    updatedSchools[level][index] = { ...updatedSchools[level][index], [field]: value };
    updateData({ ...data, previousSchools: updatedSchools });
  };

  const addSchool = (level) => {
    const updatedSchools = { ...data.previousSchools };
    updatedSchools[level] = [
      ...(updatedSchools[level] || []),
      { schoolName: '', address: '', yearsOfAttendance: '', honors: '' },
    ];
    updateData({ ...data, previousSchools: updatedSchools });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Previous School Record</h2>

      {['Primary/Elementary', 'Secondary (Junior High)', 'Secondary (Senior High)', 'College/Tertiary'].map(
        (level) => (
          <div key={level} className="school-level-section">
            <h3>{level}</h3>
            {(data.previousSchools?.[level] || []).map((school, index) => (
              <div key={index} className="school-entry">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name of School:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={school.schoolName || ''}
                      onChange={(e) =>
                        handleSchoolChange(level, index, 'schoolName', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={school.address || ''}
                      onChange={(e) =>
                        handleSchoolChange(level, index, 'address', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Inclusive Years of Attendance:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={school.yearsOfAttendance || ''}
                      onChange={(e) =>
                        handleSchoolChange(level, index, 'yearsOfAttendance', e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Honors Received:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={school.honors || ''}
                      onChange={(e) =>
                        handleSchoolChange(level, index, 'honors', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => addSchool(level)}
            >
              + Add School
            </button>
          </div>
        )
      )}

      {/* Additional Field for College/Tertiary */}
      <div className="form-row">
        <div className="form-group">
          <label>Senior High General Average:</label>
          <input
            type="number"
            className="form-input"
            value={data.generalAverage || ''}
            onChange={(e) => updateData({ ...data, generalAverage: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default SCIFPreviousSchoolRecord;