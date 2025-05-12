import React from 'react';
import '../SetupProfile/css/multistep.css';

const SCIFFamilyData = ({ data, updateData }) => {
  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...(data.siblings || [])];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    updateData({ ...data, siblings: updatedSiblings });
  };

  const addSibling = () => {
    updateData({
      ...data,
      siblings: [...(data.siblings || []), { name: '', sex: '', age: '', job: '', education: '', school: '' }],
    });
  };

  const removeSibling = (index) => {
    const updatedSiblings = (data.siblings || []).filter((_, i) => i !== index);
    updateData({ ...data, siblings: updatedSiblings });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Family Data</h2>

      {/* Father */}
      <div className="form-row">
        <div className="form-group">
          <label>Father's Name:</label>
          <input
            type="text"
            value={data.fatherName || ''}
            onChange={(e) => updateData({ ...data, fatherName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={data.fatherAge || ''}
            onChange={(e) => updateData({ ...data, fatherAge: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Job/Occupation:</label>
          <input
            type="text"
            value={data.fatherJob || ''}
            onChange={(e) => updateData({ ...data, fatherJob: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Company/Agency:</label>
          <input
            type="text"
            value={data.fatherCompany || ''}
            onChange={(e) => updateData({ ...data, fatherCompany: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Company Address:</label>
          <input
            type="text"
            value={data.fatherCompanyAddress || ''}
            onChange={(e) => updateData({ ...data, fatherCompanyAddress: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Highest Educational Attainment:</label>
          <input
            type="text"
            value={data.fatherEducation || ''}
            onChange={(e) => updateData({ ...data, fatherEducation: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            value={data.fatherContact || ''}
            onChange={(e) => updateData({ ...data, fatherContact: e.target.value })}
          />
        </div>
      </div>

      {/* Mother */}
      <div className="form-row">
        <div className="form-group">
          <label>Mother's Name:</label>
          <input
            type="text"
            value={data.motherName || ''}
            onChange={(e) => updateData({ ...data, motherName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={data.motherAge || ''}
            onChange={(e) => updateData({ ...data, motherAge: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Job/Occupation:</label>
          <input
            type="text"
            value={data.motherJob || ''}
            onChange={(e) => updateData({ ...data, motherJob: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Company/Agency:</label>
          <input
            type="text"
            value={data.motherCompany || ''}
            onChange={(e) => updateData({ ...data, motherCompany: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Company Address:</label>
          <input
            type="text"
            value={data.motherCompanyAddress || ''}
            onChange={(e) => updateData({ ...data, motherCompanyAddress: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Highest Educational Attainment:</label>
          <input
            type="text"
            value={data.motherEducation || ''}
            onChange={(e) => updateData({ ...data, motherEducation: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            value={data.motherContact || ''}
            onChange={(e) => updateData({ ...data, motherContact: e.target.value })}
          />
        </div>
      </div>

      {/* Siblings */}
      <div className="form-row">
        <h3>Siblings</h3>
      </div>
      {(data.siblings || []).map((sibling, index) => (
        <div key={index} className="sibling-section">
          <div className="form-row">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-input"
                value={sibling.name}
                onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Sex:</label>
              <select
                className="form-input"
                value={sibling.sex}
                onChange={(e) => handleSiblingChange(index, 'sex', e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                className="form-input"
                value={sibling.age}
                onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Job/Occupation:</label>
              <input
                type="text"
                className="form-input"
                value={sibling.job}
                onChange={(e) => handleSiblingChange(index, 'job', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Educational Attainment:</label>
              <input
                type="text"
                className="form-input"
                value={sibling.education}
                onChange={(e) => handleSiblingChange(index, 'education', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Company/School:</label>
              <input
                type="text"
                className="form-input"
                value={sibling.school}
                onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => removeSibling(index)}
          >
            Remove Sibling
          </button>
        </div>
      ))}
      <button type="button" onClick={addSibling} className="btn-primary">
        + Add Sibling
      </button>

      {/* Guardian */}
      <div className="form-row">
        <div className="form-group">
          <label>Guardian (while in UP):</label>
          <input
            type="text"
            value={data.guardianName || ''}
            onChange={(e) => updateData({ ...data, guardianName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Contact No.:</label>
          <input
            type="text"
            value={data.guardianContact || ''}
            onChange={(e) => updateData({ ...data, guardianContact: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={data.guardianAddress || ''}
            onChange={(e) => updateData({ ...data, guardianAddress: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Relationship to Guardian:</label>
          <input
            type="text"
            value={data.guardianRelation || ''}
            onChange={(e) => updateData({ ...data, guardianRelation: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Languages/Dialects Spoken at Home:</label>
          <input
            type="text"
            value={data.languages || ''}
            onChange={(e) => updateData({ ...data, languages: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default SCIFFamilyData;