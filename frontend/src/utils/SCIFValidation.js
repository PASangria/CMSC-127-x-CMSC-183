export const validateParent = (formData) => {
  const errors = [];

  const mother = formData.family_data.mother || {};
  const hasAnyInputMother = Object.entries(mother).some(
    ([key, value]) => key !== 'id' && value !== null && value !== ''
  );
  if (hasAnyInputMother) {
    if (!mother.first_name) errors.push("Mother's first name is required.");
    if (!mother.last_name) errors.push("Mother's last name is required.");
    if (!mother.contact_number) {
      errors.push("Mother's contact number is required.");
    } else if (!/^\+?\d{9,15}$/.test(mother.contact_number)) {
      errors.push("Mother's contact  must be a valid phone number.");
    }
  }

  const father = formData.family_data.father || {};
  const hasAnyInputFather = Object.entries(father).some(
    ([key, value]) => key !== 'id' && value !== null && value !== ''
  );
  if (hasAnyInputFather) {
    if (!father.first_name) errors.push("Father's first name is required.");
    if (!father.last_name) errors.push("Father's last name is required.");
    if (!father.contact_number) {
      errors.push("Father's contact number is required.");
    } else if (!/^\+?\d{9,15}$/.test(father.contact_number)) {
      errors.push("Father's contact number must be a valid phone number.");
    }
  }

  return errors;
};


export const validateGuardian = (formData) => {
  const errors = [];

  const guardian = formData.family_data.guardian;

  const hasAnyInputGuardian = Object.entries(guardian).some(
    ([key, value]) =>
      key !== 'language_dialect' && 
      typeof value === 'string' &&
      value.trim() !== ''
  );

  if (hasAnyInputGuardian) {
    if (!guardian.first_name) errors.push("Guardian's first name is required.");
    if (!guardian.last_name) errors.push("Guardian's last name is required.");
    if (!guardian.contact_number) {
      errors.push("Guardian's contact number is required.");
    } else if (!/^\+?\d{9,15}$/.test(guardian.contact_number)) {
      errors.push("Guardian's contact number must be a valid phone number.");
    }
    if (!guardian.address) errors.push("Guardian's address is required.");
    if (!guardian.relationship_to_guardian) errors.push("Relationship to guardian is required.");
  }

  return errors;
};

export const validateSibling = (formData) => {
  const errors = [];

  formData.siblings.forEach((sibling, index) => {
    const hasAnyInput = Object.values(sibling).some(value => value !== null && value !== '');
    if (hasAnyInput) {
      if (!sibling.first_name) errors.push(`Sibling #${index + 1}'s first name is required.`);
      if (!sibling.last_name) errors.push(`Sibling #${index + 1}'s last name is required.`);
      if (!sibling.sex) errors.push(`Sibling #${index + 1}'s sex is required.`);
      if (!sibling.age) errors.push(`Sibling #${index + 1}'s age is required.`);
      if (!sibling.educational_attainment) errors.push(`Sibling #${index + 1}'s educational attainment is required.`);
    }
  });

  return errors;
};


export const validateHealthData = (formData) => {
  const errors = [];
  const healthData = formData.health_data;

  const requiredFields = [
    'health_condition',
    'height',
    'weight',
    'eye_sight',
    'hearing',
  ];

  requiredFields.forEach(field => {
    if (
      healthData[field] === undefined ||
      healthData[field] === null ||
      healthData[field] === ''
    ) {
      const label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      errors.push(`${label} is required.`);
    }
  });

  if (healthData.last_hospitalization && !healthData.reason_of_hospitalization?.trim()) {
    errors.push("Reason for hospitalization is required if last hospitalization is specified.");
  }

  return errors;
};

export const validatePreviousSchool = (records) => {
  const errors = [];
  if (Array.isArray(records)) {
    records.forEach((record, index) => {
      const recordErrors = [];
      const requiredFields = ['education_level', 'start_year', 'end_year'];

      requiredFields.forEach(field => {
        if (!record[field] && record[field] !== 0) {
          const label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          recordErrors.push(`${label} is required.`);
        }
      });

      if (!record.school?.name) {
        recordErrors.push("School name is required.");
      }

      const start = Number(record.start_year);
      const end = Number(record.end_year);

      if (start && end && end < start) {
        recordErrors.push("End year cannot be earlier than start year.");
      }

      if ((start > new Date().getFullYear() || end > new Date().getFullYear())) {
        recordErrors.push("Start or end year cannot be in the future.");
      }

      // GPA requirement for Senior High
      if (record.education_level === 'Senior High') {
        if (!record.senior_high_gpa && record.senior_high_gpa !== 0) {
          recordErrors.push("Senior High GPA is required.");
        }
      } else {
        if (record.senior_high_gpa) {
          recordErrors.push("GPA must not be provided for non-Senior High education levels.");
        }
      }

      // Collect errors per record
      if (recordErrors.length > 0) {
        errors.push({
          record: index + 1,
          messages: recordErrors,
        });
      }
    });
  } else {
    errors.push("Previous school records must be an array.");
  }

  return errors;
};


export const validatePersonalityTraits = (formData) => {
  const errors = [];
    const requiredFields = [
      'enrollment_reason', 'degree_program_aspiration',
      'special_talents', 'musical_instruments', 'hobbies',
      'likes_in_people', 'dislikes_in_people'
    ];

    requiredFields.forEach(field => {
    const value = formData[field];
    if (value === undefined || value === null || value === '') {
      errors.push(`${field.replace(/_/g, ' ')} is required.`);
    }
  });


    if (formData.degree_program_aspiration === false && !formData.aspiration_explanation) {
      errors.push("Aspiration explanation is required if degree program aspiration is false.");
    }
  return errors;
};

export const validateFamilyRelationship = (formData) => {
  const errors = [];
    if (!formData.closest_to) errors.push("Closest to is required.");

    if (formData.closest_to === 'Other' && !formData.specify_other) {
      errors.push("Please specify the relationship when 'Other' is selected.");
    }
  return errors;
};

export const validateCounselingInfo = (formData) => {
  const errors = [];
    const requiredFields = [
      'personal_characteristics', 'problem_confidant', 'confidant_reason', 'anticipated_problems'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) errors.push(`${field.replace(/_/g, ' ')} is required.`);
    });

    if (formData.previous_counseling) {
      if (!formData.counseling_location) errors.push("Counseling location is required.");
      if (!formData.counseling_reason) errors.push("Counseling reason is required.");
    }
  return errors;
};
