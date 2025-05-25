import React from "react";
import FormField from "../../components/FormField";
import "../SetupProfile/css/multistep.css";
import { clearError } from "../../utils/helperFunctions";

const SCIFHealthData = ({ data, updateData, readOnly = false, errors, setErrors }) => {
  const normalizeNumber = (value) => {
    if (readOnly) return;
    if (value === "" || value === null || value === undefined) return null;
    const number = Number(value);
    return isNaN(number) ? null : number;
  };

  const normalizeText = (value) => {
    if (readOnly) return;
    return value === "" ? null : value;
  };

  const normalizeList = (value) => {
    if (readOnly) return;
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const handleHealthConditionChange = (condition) => {
    if (readOnly) return;
    updateData({
      ...data,
      health_condition: normalizeText(condition),
    });
    if (errors?.["health_data.health_condition"]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors["health_data.health_condition"];
        return newErrors;
      });
    }
  };

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>
        <h2 className="step-title">Health Data</h2>

        {/* Health Condition (Radio Buttons) */}
        <div className="radio-form ">
          <label className="form-label ">Health Condition:</label>
          <div className="radio-group form-row .span-two-columns">
            {["Excellent", "Very Good", "Good", "Poor"].map((condition) => (
              <label key={condition} className="radio-label">
                <input
                  type="radio"
                  name="health_condition"
                  value={condition}
                  checked={data.health_condition === condition}
                  onChange={() => handleHealthConditionChange(condition)}
                />
                {condition}
              </label>
            ))}
          </div>
            {errors?.["health_data.health_condition"] && (
              <p className="error-message">{errors["health_data.health_condition"]}</p>
            )}  
        </div>

        {/* Height and Weight */}
        <div className="subsection-form"></div>
         <div className="form-row">
          <FormField
            label="Height (m)"
            type="number"
            value={data.height ?? ""}
            onFocus={() => clearError("health_data.height")}
            onChange={(e) =>
              updateData({ ...data, height: normalizeNumber(e.target.value) })
            }
            error={errors?.["health_data.height"]}
          />

          <FormField
            label="Weight (kg)"
            type="number"
            value={data.weight ?? ""}
            onFocus={() => clearError("health_data.weight")}
            onChange={(e) =>
              updateData({ ...data, weight: normalizeNumber(e.target.value) })
            }
            error={errors?.["health_data.weight"]}
          />
        </div>

        {/* Eye Sight and Hearing */}
         <div className="form-row">
          <FormField
            label="Eye Sight"
            type="select"
            value={data.eye_sight || ""}
            onFocus={() => clearError("health_data.eye_sight")}
            onChange={(e) =>
              updateData({ ...data, eye_sight: normalizeText(e.target.value) })
            }
            options={[
              { value: "", label: "Select" },
              { value: "Good", label: "Good" },
              { value: "Medium", label: "Medium" },
              { value: "Poor", label: "Poor" },
            ]}
            error={errors?.["health_data.eye_sight"]}
          />

          <FormField
            label="Hearing"
            type="select"
            value={data.hearing || ""}
            onFocus={() => clearError("health_data.hearing")}
            onChange={(e) =>
              updateData({ ...data, hearing: normalizeText(e.target.value) })
            }
            options={[
              { value: "", label: "Select" },
              { value: "Good", label: "Good" },
              { value: "Medium", label: "Medium" },
              { value: "Poor", label: "Poor" },
            ]}
            error={errors?.["health_data.hearing"]}
          />
        </div>

        {/* Disabilities and Ailments */}
        <div className="form-row">
          <FormField
            label="Any Physical Disability"
            type="text"
            value={(data.physical_disabilities || []).join(", ")}
            onFocus={() => clearError("health_data.physical_disabilities")}
            onChange={(e) =>
              updateData({
                ...data,
                physical_disabilities: normalizeList(e.target.value),
              })
            }
            error={errors?.["health_data.physical_disabilities"]}
          />

          <FormField
            label="Common/ Frequent Ailment"
            type="text"
            value={(data.common_ailments || []).join(", ")}
            onFocus={() => clearError("health_data.common_ailments")}
            onChange={(e) =>
              updateData({
                ...data,
                common_ailments: normalizeList(e.target.value),
              })
            }
            error={errors?.["health_data.common_ailments"]}
          />
        </div>

        {/* Hospitalization */}
         <div className="custom-form-row">
          <FormField
            label="Last Hospitalization (MM/DD/YYYY)"
            type="date"
            value={data.last_hospitalization || ""}
            onFocus={() => clearError("health_data.last_hospitalization")}
            onChange={(e) =>
              updateData({ ...data, last_hospitalization: e.target.value })
            }
            className="custom-form-input form-input"
            error={errors?.["health_data.last_hospitalization"]}
          />

          <FormField
            label="Reason for Hospitalization"
            type="textarea"
            value={data.reason_of_hospitalization || ""}
            onFocus={() => clearError("health_data.reason_of_hospitalization")}
            onChange={(e) =>
              updateData({ ...data, reason_of_hospitalization: e.target.value })
            }
            className="custom-form-input form-input"
            error={errors?.["health_data.reason_of_hospitalization"]}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default SCIFHealthData;
