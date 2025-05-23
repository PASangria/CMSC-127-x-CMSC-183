import React, { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import "../SetupProfile/css/multistep.css";
import { useEnumChoices } from "../../utils/enumChoices";
import Button from "../../components/UIButton";

const REQUIRED_LEVELS = ["Primary", "Junior High", "Senior High"];

const SCIFPreviousSchoolRecord = ({ data, updateData, readOnly = false }) => {
  const [schoolRecords, setSchoolRecords] = useState(data || []);
  const { enums, loading, error } = useEnumChoices();

  const handleFieldChange = (index, field, value) => {
    if (readOnly) return;
    const updated = [...schoolRecords];
    const path = field.split(".");
    let target = updated[index];
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]] ||= {};
    }
    target[path[path.length - 1]] = value;
    setSchoolRecords(updated);
    updateData(updated);
  };

  const addRecord = (level) => {
    const newRecord = {
      student_number: "",
      school: {
        name: "",
        school_address: {
          address_line_1: "",
          barangay: "",
          city_municipality: "",
          province: "",
          region: "",
          zip_code: "",
        },
      },
      education_level: level,
      start_year: "",
      end_year: "",
      honors_received: "",
      senior_high_gpa: "",
      submission: "",
    };
    const updated = [...schoolRecords, newRecord];
    setSchoolRecords(updated);
    updateData(updated);
  };

  const removeRecord = (index) => {
    const recordToRemove = schoolRecords[index];
    const isRequiredLevel = REQUIRED_LEVELS.includes(
      recordToRemove.education_level
    );
    const countSameLevel = schoolRecords.filter(
      (r) => r.education_level === recordToRemove.education_level
    ).length;

    if (isRequiredLevel && countSameLevel <= 1) {
      alert(
        `You must have at least one ${recordToRemove.education_level} record.`
      );
      return;
    }

    const updated = schoolRecords.filter((_, i) => i !== index);
    setSchoolRecords(updated);
    updateData(updated);
  };

  useEffect(() => {
    if (schoolRecords.length === 0) {
      REQUIRED_LEVELS.forEach((level) => addRecord(level));
    }
    // eslint-disable-next-line
  }, []);

  const renderSection = (level, isRequired = true) => {
    const records = schoolRecords.filter((r) => r.education_level === level);
    return (
      <div className="school-section">
        <h2>{level} School</h2>
        {records.map((record, index) => {
          const globalIndex = schoolRecords.findIndex((r) => r === record);
          return (
            <div key={globalIndex} className="school-record subsection-form">
              <FormField
                label="School Name"
                type="text"
                value={record.school.name}
                onChange={(e) =>
                  handleFieldChange(globalIndex, "school.name", e.target.value)
                }
              />
              <h3 className="step-info school">{level} School Address</h3>
              <div className="form-row three-columns">
                <FormField
                  label="Address Line 1"
                  type="text"
                  value={record.school.school_address.address_line_1}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "school.school_address.address_line_1",
                      e.target.value
                    )
                  }
                />
                <FormField
                  label="Barangay"
                  type="text"
                  value={record.school.school_address.barangay}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "school.school_address.barangay",
                      e.target.value
                    )
                  }
                />
                <FormField
                  label="City/Municipality"
                  type="text"
                  value={record.school.school_address.city_municipality}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "school.school_address.city_municipality",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="form-row three-columns">
                <FormField
                  label="Province"
                  type="text"
                  value={record.school.school_address.province}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "school.school_address.province",
                      e.target.value
                    )
                  }
                />
                <FormField
                  label="Region"
                  type="select"
                  value={record.school.school_address.region}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "school.school_address.region",
                      e.target.value
                    )
                  }
                  required
                  error={error}
                  options={
                    loading
                      ? [{ value: "", label: "Loading regions..." }]
                      : error
                      ? [{ value: "", label: "Error loading regions" }]
                      : enums?.region || []
                  }
                />
                <FormField
                  label="ZIP Code"
                  type="text"
                  value={record.school.school_address.zip_code}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "school.school_address.zip_code",
                      e.target.value
                    )
                  }
                />
              </div>

              <h3 className="step-info school">
                {level} School More Information
              </h3>
              <div className="form-row three-columns">
                <FormField
                  label="Start Year"
                  type="number"
                  value={record.start_year}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "start_year",
                      +e.target.value
                    )
                  }
                />
                <FormField
                  label="End Year"
                  type="number"
                  value={record.end_year}
                  onChange={(e) =>
                    handleFieldChange(globalIndex, "end_year", +e.target.value)
                  }
                />
                <FormField
                  label="Honors Received"
                  type="text"
                  value={record.honors_received}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "honors_received",
                      e.target.value
                    )
                  }
                />
              </div>

              {level === "Senior High" && (
                <FormField
                  label="Senior High GPA"
                  type="number"
                  value={record.senior_high_gpa}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "senior_high_gpa",
                      e.target.value
                    )
                  }
                />
              )}

              {!readOnly && (
                <Button
                  variant="secondary"
                  onClick={() => removeRecord(globalIndex)}
                  style={{ marginBottom: "2rem" }}
                >
                  Remove Record
                </Button>
              )}
            </div>
          );
        })}
        {records.length === 0 && (
          readOnly ? (
            <p style={{ color: '#666' }}>None</p>
          ) : (
            (!isRequired || records.length === 0) && (
              <Button variant="primary" onClick={() => addRecord(level)}>
                Add {level} Record
              </Button>
            )
          )
        )}
      </div>
    );
  };

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>
        <h2 className="step-title">Previous School Record</h2>
        {renderSection("Primary")}
        {renderSection("Junior High")}
        {renderSection("Senior High")}
        {renderSection("College", false)} {/* College is optional */}
      </fieldset>
    </div>
  );
};

export default SCIFPreviousSchoolRecord;
