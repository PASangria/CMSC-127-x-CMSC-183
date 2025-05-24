import React from "react";

const EditableField = ({
  label,
  value,
  onChange,
  readOnly = false,
  type = "text",
  options = [],
}) => {
  // Find the label for the selected option when type is select
  const selectedOptionLabel = options.find(opt => opt.value === value)?.label || "";

  return (
    <div className="editable-field student_side_educ_info" style={{ textAlign: "center" }}>
      {type === "select" ? (
        readOnly ? (
          // Show plain text instead of dropdown when readOnly
          <div
            style={{
              fontSize: "1rem",
              borderBottom: "1px solid black",
              background: "transparent",
              outline: "none",
              width: "100%",
              marginBottom: "4px",
              paddingBottom: "10px",
              cursor: "default",
              textAlign: "center",
              color: "black",  // force text black
              userSelect: "text", // allow text selection
            }}
          >
            {selectedOptionLabel || `Select ${label}`}
          </div>
        ) : (
          // Normal editable dropdown
          <select
            value={value}
            onChange={onChange}
            disabled={readOnly}
            style={{
              fontSize: "1rem",
              border: "none",
              borderBottom: "1px solid black",
              background: "transparent",
              outline: "none",
              width: "100%",
              marginBottom: "4px",
              paddingBottom: "10px",
              cursor: readOnly ? "default" : "pointer",
              textAlign: "center",
              color: "black",
            }}
          >
            <option value="">Select {label}</option>
            {options.map(({ value: optValue, label: optLabel }) => (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            ))}
          </select>
        )
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className="editable-input"
          style={{
            fontSize: "1rem",
            border: "none",
            borderBottom: "1px solid black",
            background: "transparent",
            outline: "none",
            width: "100%",
            marginBottom: "4px",
            paddingBottom: "10px",
            cursor: readOnly ? "default" : "text",
            textAlign: "center",
            color: "black",
          }}
        />
      )}

        <strong>{label}:</strong>

    </div>
  );
};
const ReadonlyField = ({ label, value }) => {
  return (
    <div className="student_side_educ_info">
      <input
        type="text"
        value={value}
        readOnly
        className="editable-input"
        style={{
          fontSize: "1rem",
          border: "none",
          borderBottom: "1px solid black",
          background: "transparent",
          outline: "none",
          width: "100%",
          marginBottom: "4px",
          textAlign: "center",
          paddingBottom: "10px",
          cursor: "default",
          color: "inherit",
        }}
      />
      <strong>{label}:</strong>
    </div>
  );
};

export { EditableField, ReadonlyField };
