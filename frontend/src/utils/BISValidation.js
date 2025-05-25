export const validatePreferences = (formData) => {
  const errors = {};

  if (!formData.preferences.influence) errors["preferences.influence"] = "Influence is required.";
  if (!formData.preferences.reason_for_enrolling) errors["preferences.reason_for_enrolling"] = "Reason for enrolling is required.";
  if (formData.preferences.transfer_plans === undefined) errors["preferences.transfer_plans"] = "Transfer plans must be specified.";
  if (!formData.preferences.transfer_reason) errors["preferences.transfer_reason"] = "Transfer reason is required.";
  if (formData.preferences.shift_plans === undefined) errors["preferences.shift_plans"] = "Shift plans must be specified.";
  if (formData.preferences.shift_plans) {
    if (!formData.preferences.planned_shift_degree) errors["preferences.planned_shift_degree"] = "Planned shift degree is required.";
    if (!formData.preferences.reason_for_shifting) errors["preferences.reason_for_shifting"] = "Reason for shifting is required.";
  }

  return errors;
};

export const validateSupport = (formData) => {
  const errors = {};

  const support = Array.isArray(formData.student_support.support) ? formData.student_support.support : [];

  if (support.length === 0) {
    errors["student_support.support"] = "At least one support option is required.";
  }

  if (support.includes('others') && !formData.student_support.other_notes) {
    errors["student_support.other_notes"] = "Other notes are required.";
  }

  if (support.includes('scholarship') && !formData.student_support.other_scholarship) {
    errors["student_support.other_scholarship"] = "Scholarship description is required.";
  }

  if (support.includes('combination') && !formData.student_support.combination_notes) {
    errors["student_support.combination_notes"] = "Combination notes are required.";
  }

  return errors;
};


export const validateSocioEconomicStatus = (formData) => {
  const errors = {};

  const status = formData.socio_economic_status || {};

  if (status.has_scholarship === null || status.has_scholarship === undefined) {
    errors["socio_economic_status.has_scholarship"] = "Scholarship status is required.";
  }

  if (!status.monthly_allowance) {
    errors["socio_economic_status.monthly_allowance"] = "Monthly allowance is required.";
  }

  if (!status.spending_habit) {
    errors["socio_economic_status.spending_habit"] = "Spending habit is required.";
  }

  if (status.has_scholarship) {
    if (!status.scholarships) {
      errors["socio_economic_status.scholarships"] = "Scholarship name is required.";
    }
    if (!status.scholarship_privileges) {
      errors["socio_economic_status.scholarship_privileges"] = "Scholarship privileges are required.";
    }
  }

  return errors;
};


export const validateScholasticStatus = (formData) => {
  const errors = {};
  const status = formData.scholastic_status || {};

  if (!status.intended_course) {
    errors["scholastic_status.intended_course"] = "Intended course is required.";
  }
  if (!status.first_choice_course) {
    errors["scholastic_status.first_choice_course"] = "First choice is required.";
  }
  if (!status.admitted_course) {
    errors["scholastic_status.admitted_course"] = "Admitted course is required.";
  }
  if (
    status.first_choice_course &&
    status.admitted_course &&
    status.first_choice_course !== status.admitted_course &&
    !status.next_plan
  ) {
    errors["scholastic_status.next_plan"] = "Next plan is required if admitted course differs.";
  }

  return errors;
};

