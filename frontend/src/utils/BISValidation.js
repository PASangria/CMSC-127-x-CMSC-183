export const validatePreferences = (formData) => {
  const errors = [];
  if (!formData.preferences.influence) errors.push("Influence is required.");
  if (!formData.preferences.reason_for_enrolling) errors.push("Reason for enrolling is required.");
  if (formData.preferences.transfer_plans === null) errors.push("Transfer plans must be specified.");
  if (formData.preferences.transfer_plans && !formData.preferences.transfer_reason) errors.push("Transfer reason is required.");
  if (formData.preferences.shift_plans === null) errors.push("Shift plans must be specified.");
  if (formData.preferences.shift_plans) {
    if (!formData.preferences.planned_shift_degree) errors.push("Planned shift degree is required.");
    if (!formData.preferences.reason_for_shifting) errors.push("Reason for shifting is required.");
  }
  return errors;
};

export const validateSupport = (formData) => {
    console.log(formData);
  const errors = [];

  const support = Array.isArray(formData.student_support.support) ? formData.student_support.support : [];

  if (support.length === 0) {
    errors.push("At least one support option is required.");
  }

  if (support.includes('others') && !formData.student_support.other_notes) {
    errors.push("Other notes are required.");
  }

  if (support.includes('scholarship') && !formData.student_support.other_scholarship) {
    errors.push("Scholarship description is required.");
  }

  if (support.includes('combination') && !formData.student_support.combination_notes) {
    errors.push("Combination notes are required.");
  }

  return errors;
};


export const validateSocioEconomicStatus = (formData) => {
  const errors = [];
  if (formData.socio_economic_status.has_scholarship === null || formData.socio_economic_status.has_scholarship === undefined) errors.push("Scholarship status is required.");
  if (!formData.socio_economic_status.monthly_allowance) errors.push("Monthly allowance is required.");
  if (!formData.socio_economic_status.spending_habit) errors.push("Spending habit is required.");
  if (formData.socio_economic_status.has_scholarship) {
    if (!formData.socio_economic_status.scholarships) errors.push("Scholarship name is required.");
    if (!formData.socio_economic_status.scholarship_privileges) errors.push("Scholarship privileges are required.");
  }
  return errors;
};

export const validateScholasticStatus = (formData) => {
  const errors = [];
  if (!formData.scholastic_status.intended_course) errors.push("Intended course is required.");
  if (!formData.scholastic_status.first_choice_course) errors.push("First choice is required.");
  if (!formData.scholastic_status.admitted_course) errors.push("Admitted course is required.");
  if (
    formData.scholastic_status.first_choice_course &&
    formData.scholastic_status.admitted_course &&
    formData.scholastic_status.first_choice_course !== formData.scholastic_status.admitted_course &&
    !formData.scholastic_status.next_plan
  ) {
    errors.push("Next plan is required if admitted course differs.");
  }
  return errors;
};
