import React, { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import "../SetupProfile/css/multistep.css";
import { useEnumChoices } from "../../utils/enumChoices";
import Button from "../../components/UIButton";
import { clearError } from "../../utils/helperFunctions";

const REQUIRED_LEVELS = ["Primary", "Junior High", "Senior High"];

const SCIFPreviousSchoolRecord = ({
  data,
  updateData,
  readOnly = false,
  errors,
  setErrors,
}) => {
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

    // Clear GPA if not Senior High
    if (field === "education_level" && value !== "Senior High") {
      updated[index].senior_high_gpa = "";
    }

    const errorKey = `previous_school[${index}].${field}`;
    if (errors?.[errorKey]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[errorKey];
        return updatedErrors;
      });
    }

    const recordLevel =
      field === "education_level" ? value : updated[index].education_level;

    const missingLevelKey = `previous_school_missing_${recordLevel
      .replace(/\s/g, "_")
      .toLowerCase()}`;

    if (errors?.[missingLevelKey]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[missingLevelKey];
        return updatedErrors;
      });
    }

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
        <div className="line"></div>
        <h2 className="step-info school">{level} School</h2>
        {records.map((record, index) => {
          const globalIndex = schoolRecords.findIndex((r) => r === record);
          return (
            <div key={globalIndex} className="school-record subsection-form">
              <h3 className="step-info school">{level} School Data</h3>
              <FormField
                label="School Name"
                type="text"
                value={record.school.name}
                onFocus={() => clearError(globalIndex, "school.name")}
                onChange={(e) =>
                  handleFieldChange(globalIndex, "school.name", e.target.value)
                }
                error={errors?.[`previous_school[${globalIndex}].school.name`]}
              />

              <h3 className="step-info school">{level} School Address</h3>
              <div className="form-row three-columns">
                {[
                  "address_line_1",
                  "barangay",
                  "city_municipality",
                  "province",
                  "region",
                  "zip_code",
                ].map((field) => (
                  <FormField
                    key={field}
                    label={field
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    type={field === "region" ? "select" : "text"}
                    value={record.school.school_address[field]}
                    onFocus={() =>
                      clearError(globalIndex, `school.school_address.${field}`)
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        globalIndex,
                        `school.school_address.${field}`,
                        e.target.value
                      )
                    }
                    error={
                      errors?.[
                        `previous_school[${globalIndex}].school.school_address.${field}`
                      ]
                    }
                    options={
                      field === "region"
                        ? loading
                          ? [{ value: "", label: "Loading regions..." }]
                          : error
                          ? [{ value: "", label: "Error loading regions" }]
                          : enums?.region || []
                        : undefined
                    }
                  />
                ))}
              </div>

              <h3 className="step-info school">
                {level} School More Information
              </h3>
              <div className="form-row three-columns">
                <FormField
                  label="Start Year"
                  type="number"
                  value={record.start_year}
                  onFocus={() => clearError(globalIndex, "start_year")}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "start_year",
                      +e.target.value
                    )
                  }
                  error={errors?.[`previous_school[${globalIndex}].start_year`]}
                />
                <FormField
                  label="End Year"
                  type="number"
                  value={record.end_year}
                  onFocus={() => clearError(globalIndex, "end_year")}
                  onChange={(e) =>
                    handleFieldChange(globalIndex, "end_year", +e.target.value)
                  }
                  error={errors?.[`previous_school[${globalIndex}].end_year`]}
                />
                <FormField
                  label="Honors Received"
                  type="text"
                  value={record.honors_received}
                  onFocus={() => clearError(globalIndex, "honors_received")}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "honors_received",
                      e.target.value
                    )
                  }
                  error={
                    errors?.[`previous_school[${globalIndex}].honors_received`]
                  }
                />
              </div>

              {level === "Senior High" && (
                <FormField
                  label="Senior High GPA"
                  type="number"
                  value={record.senior_high_gpa}
                  onFocus={() => clearError(globalIndex, "senior_high_gpa")}
                  onChange={(e) =>
                    handleFieldChange(
                      globalIndex,
                      "senior_high_gpa",
                      e.target.value
                    )
                  }
                  error={
                    errors?.[`previous_school[${globalIndex}].senior_high_gpa`]
                  }
                />
              )}

              {!readOnly && (
                <Button
                  variant="secondary"
                  onClick={() => removeRecord(globalIndex)}
                  style={{ marginBottom: "1rem" }}
                  className={"school-button"}
                >
                  Remove Record
                </Button>
              )}
            </div>
          );
        })}
        {readOnly ? (
          <p style={{ color: "#666" }}>None</p>
        ) : (
          <Button
            variant="primary"
            onClick={() => addRecord(level)}
            className={"school-button"}
          >
            Add Another {level} School Record
          </Button>
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
        {renderSection("College", false)}
      </fieldset>
      {Object.entries(errors || {})
        .filter(([key]) => key.startsWith("previous_school_missing_"))
        .map(([key, message]) => (
          <p key={key} className="error-message" style={{marginLeft: "2rem"}}>
            {message}
          </p>
        ))}
    </div>
  );
};

export default SCIFPreviousSchoolRecord;
