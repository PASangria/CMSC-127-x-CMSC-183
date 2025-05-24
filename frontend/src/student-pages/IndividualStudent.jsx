import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayField from "../components/DisplayField";
import Button from "../components/UIButton";
import { ReadonlyField, EditableField } from "../components/EditableField";
import FormField from "../components/FormField";
import "./css/individualStudentInfo.css";
import { useEnumChoices } from "../utils/enumChoices";
import ToastMessage from "../components/ToastMessage";
import ConfirmDialog from "../components/ConfirmDialog";

const StudentSideInfo = ({
  profileData,
  submittedForms = [],
  onUpdate,
  isAdmin = false,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData || {});
  const { enums, loading: enumsLoading, error: enumsError } = useEnumChoices();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [toast, setToast] = useState(null);
  if (!profileData) {
    return <div>Loading...</div>;
  }

  const {
    first_name,
    last_name,
    student_number,
    date_initial_entry,
    date_initial_entry_sem,
    email,
  } = formData;


const handleView = (form, isAdmin = false, studentId = null) => {
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  const slug = slugify(form.form_type);

  if (isAdmin && studentId) {
    if (form.status === "submitted") {
      navigate(`/admin/student-forms/${studentId}/${slug}/`);
    }
  } else {
    // Normal user routes
    if (form.status === "draft") {
      navigate(`/forms/${slug}`);
    } else if (form.status === "submitted") {
      navigate(`/submitted-forms/${slug}`);
    }
  }
};


  const updateProfileData = (updatedFields) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const updateNestedField = (parentField, updatedFields) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        ...updatedFields,
      },
    }));
  };

  const handleUpdate = () => {
    setConfirmAction("save");
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setConfirmAction("cancel");
    setShowConfirm(true);
  };

  const handleConfirmDialog = async () => {
    if (confirmAction === "save") {
      await onUpdate(formData);
      setToast("Profile updated successfully!");
    } else if (confirmAction === "cancel") {
      setFormData(profileData); // Reset changes
      setToast("Changes were discarded.");
    }

    setIsEditing(false);
    setShowConfirm(false);
    setConfirmAction(null);
  };

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  return (
    <div className="student_profile_wrapper">
      <div className="info-sections-container">
        <div className="student_side_info">
          <div className="bigger_avatar">
            {first_name?.charAt(0)}
            {last_name?.charAt(0)}
          </div>

          <div>
            <ReadonlyField label="Student Number" value={student_number} />
            <EditableField
              label="Current Year Level"
              type="select"
              value={formData.current_year_level || ""}
              onChange={(e) =>
                updateProfileData({ current_year_level: e.target.value })
              }
              options={enums?.year_level || []}
              readOnly={!isEditing}
            />
            <EditableField
              label="Degree Program"
              type="select"
              value={formData.degree_program || ""}
              onChange={(e) =>
                updateProfileData({ degree_program: e.target.value })
              }
              readOnly={!isEditing}
              options={
                enumsLoading
                  ? [{ value: "", label: "Loading degree programs..." }]
                  : enumsError
                  ? [{ value: "", label: "Error loading degree programs" }]
                  : enums?.degree_program || []
              }
            />
            <EditableField
              label="College / Department"
              type="select"
              value={formData.college || ""}
              onChange={(e) => updateProfileData({ college: e.target.value })}
              options={enums?.college || []}
              readOnly={!isEditing}
            />
            <ReadonlyField label="UP Mail" value={email} />
            <ReadonlyField
              label="Date of Initial Entry"
              value={`${date_initial_entry_sem} - AY ${date_initial_entry}`}
            />
          </div>
        </div>

        <div className="right-student-profile">
          <div className="student-personal-info">
            <div className="info-group">
              <p>
                <strong>PERSONAL INFORMATION</strong>
              </p>
              <div className="form-row three-columns">
                <FormField
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) =>
                    updateProfileData({ first_name: e.target.value })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) =>
                    updateProfileData({ last_name: e.target.value })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Middle Name"
                  value={formData.middle_name}
                  onChange={(e) =>
                    updateProfileData({ middle_name: e.target.value })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <div className="form-row three-columns">
                <FormField
                  label="Nickname"
                  value={formData.nickname}
                  onChange={(e) =>
                    updateProfileData({ nickname: e.target.value })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Sex"
                  value={formData.sex}
                  onChange={(e) => updateProfileData({ sex: e.target.value })}
                  readOnly={!isEditing}
                />
                <FormField
                  label="Religion"
                  value={formData.religion}
                  onChange={(e) =>
                    updateProfileData({ religion: e.target.value })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <div className="form-row three-columns">
                <FormField
                  label="Birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) =>
                    updateProfileData({ birthdate: e.target.value })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Birth Place"
                  value={formData.birthplace}
                  onChange={(e) =>
                    updateProfileData({ birthplace: e.target.value })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Birth Rank"
                  value={formData.birth_rank}
                  onChange={(e) =>
                    updateProfileData({ birth_rank: e.target.value })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <div className="form-row">
                <FormField
                  label="Contact Number"
                  value={formData.contact_number}
                  onChange={(e) =>
                    updateProfileData({ contact_number: e.target.value })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Landline Number"
                  value={formData.landline_number || "None"}
                  onChange={(e) =>
                    updateProfileData({ landline_number: e.target.value })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <p>
                <strong>PERMANENT ADDRESS</strong>
              </p>
              <FormField
                label="Address Line 1"
                value={formData.permanent_address?.address_line_1 || ""}
                onChange={(e) =>
                  updateNestedField("permanent_address", {
                    address_line_1: e.target.value,
                  })
                }
                readOnly={!isEditing}
              />
              <FormField
                label="Address Line 2"
                value={formData.permanent_address?.address_line_2 || "N/A"}
                onChange={(e) =>
                  updateNestedField("permanent_address", {
                    address_line_2: e.target.value,
                  })
                }
                readOnly={!isEditing}
              />
              <div className="form-row">
                <FormField
                  label="Barangay"
                  value={formData.permanent_address?.barangay || ""}
                  onChange={(e) =>
                    updateNestedField("permanent_address", {
                      barangay: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="City/Municipality"
                  value={formData.permanent_address?.city_municipality || ""}
                  onChange={(e) =>
                    updateNestedField("permanent_address", {
                      city_municipality: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <div className="form-row three-columns">
                <FormField
                  label="Province"
                  value={formData.permanent_address?.province || ""}
                  onChange={(e) =>
                    updateNestedField("permanent_address", {
                      province: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Region"
                  type="select"
                  value={formData.permanent_address?.region || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    updateNestedField("permanent_address", {
                      region: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  options={
                    enums?.region?.map((opt) => ({
                      value: opt.value,
                      label: opt.label,
                    })) || []
                  }
                />
                <FormField
                  label="ZIP code"
                  value={formData.permanent_address?.zip_code || ""}
                  onChange={(e) =>
                    updateNestedField("permanent_address", {
                      zip_code: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <p>
                <strong>ADDRESS WHILE IN UP</strong>
              </p>
              <FormField
                label="Address Line 1"
                value={formData.address_while_in_up?.address_line_1 || ""}
                onChange={(e) =>
                  updateNestedField("address_while_in_up", {
                    address_line_1: e.target.value,
                  })
                }
                readOnly={!isEditing}
              />
              <FormField
                label="Address Line 2"
                value={formData.address_while_in_up?.address_line_2 || "N/A"}
                onChange={(e) =>
                  updateNestedField("address_while_in_up", {
                    address_line_2: e.target.value,
                  })
                }
                readOnly={!isEditing}
              />
              <div className="form-row">
                <FormField
                  label="Barangay"
                  value={formData.address_while_in_up?.barangay || ""}
                  onChange={(e) =>
                    updateNestedField("address_while_in_up", {
                      barangay: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="City/Municipality"
                  value={formData.address_while_in_up?.city_municipality || ""}
                  onChange={(e) =>
                    updateNestedField("address_while_in_up", {
                      city_municipality: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
              </div>

              <div className="form-row three-columns">
                <FormField
                  label="Province"
                  value={formData.address_while_in_up?.province || ""}
                  onChange={(e) =>
                    updateNestedField("address_while_in_up", {
                      province: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
                <FormField
                  label="Region"
                  type="select"
                  value={formData.address_while_in_up?.region || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    updateNestedField("address_while_in_up", {
                      region: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  options={
                    enums?.region?.map((opt) => ({
                      value: opt.value,
                      label: opt.label,
                    })) || []
                  }
                />
                <FormField
                  label="ZIP code"
                  value={formData.address_while_in_up?.zip_code || ""}
                  onChange={(e) =>
                    updateNestedField("address_while_in_up", {
                      zip_code: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div>
              {isEditing ? (
                <>
                  <Button variant="primary" onClick={handleUpdate}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                !isAdmin && (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Forms Section */}
      <div className="submitted-forms-section">
        <h2>Submitted Forms</h2>
        {submittedForms.length === 0 ? (
          <p>No submitted forms yet.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Form Type</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {submittedForms.map((form) => (
                <tr key={form.id}>
                  <td>{form.form_type}</td>
                  <td>
                    {new Date(
                      form.submitted_on || form.saved_on
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${form.status.toLowerCase()}`}
                    >
                      {form.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleView(form, isAdmin, profileData.student_number)}
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showConfirm && (
        <ConfirmDialog
          title={
            confirmAction === "save" ? "Save Changes?" : "Discard Changes?"
          }
          message={
            confirmAction === "save"
              ? "Do you want to save the updates you made?"
              : "Are you sure you want to discard all changes?"
          }
          onConfirm={handleConfirmDialog}
          onCancel={() => {
            setShowConfirm(false);
            setConfirmAction(null);
          }}
        />
      )}

      {toast && <ToastMessage message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default StudentSideInfo;
