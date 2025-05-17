// utils/SCIFValidation.js

export const validateParent = (familyData, submissionStatus) => {
  const errors = [];
  if (submissionStatus !== 'submitted') return errors;

  // Validate mother
  const mother = familyData.mother;
  const hasAnyInputMother = Object.values(mother).some(value => value !== null && value !== '');
  if (hasAnyInputMother) {
    if (!mother.first_name) errors.push("Mother's first name is required.");
    if (!mother.last_name) errors.push("Mother's last name is required.");
    if (!mother.contact_number) errors.push("Mother's contact number is required.");
    else if (!/^\+?\d{9,15}$/.test(mother.contact_number)) errors.push("Mother's contact number must be a valid phone number.");
  }

  // Validate father
  const father = familyData.father;
  const hasAnyInputFather = Object.values(father).some(value => value !== null && value !== '');
  if (hasAnyInputFather) {
    if (!father.first_name) errors.push("Father's first name is required.");
    if (!father.last_name) errors.push("Father's last name is required.");
    if (!father.contact_number) errors.push("Father's contact number is required.");
    else if (!/^\+?\d{9,15}$/.test(father.contact_number)) errors.push("Father's contact number must be a valid phone number.");
  }

  return errors;
};

export const validateGuardian = (guardian, submissionStatus) => {
  const errors = [];
  if (submissionStatus !== 'submitted') return errors;

  const hasAnyInput = Object.values(guardian).some(value => value !== null && value !== '');
  if (hasAnyInput) {
    if (!guardian.first_name) errors.push("Guardian's first name is required.");
    if (!guardian.last_name) errors.push("Guardian's last name is required.");
    if (!guardian.contact_number) errors.push("Guardian's contact number is required.");
    else if (!/^\+?\d{9,15}$/.test(guardian.contact_number)) errors.push("Guardian's contact number must be a valid phone number.");
    if (!guardian.address) errors.push("Guardian's address is required.");
    if (!guardian.relationship_to_guardian) errors.push("Relationship to guardian is required.");
  }
  return errors;
};


export const validateSibling = (siblings, submissionStatus) => {
  const errors = [];
  if (submissionStatus !== 'submitted') return errors;

  siblings.forEach((sibling, index) => {
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


export const validateHealthData = (healthData, submissionStatus) => {
  const errors = [];
  if (submissionStatus === 'submitted') {
    const requiredFields = ['student_number', 'health_condition', 'height', 'weight', 'eye_sight', 'hearing'];
    requiredFields.forEach(field => {
      if (!healthData[field] && healthData[field] !== 0) {
        errors.push(`${field.replace(/_/g, ' ')} is required.`);
      }
    });

    if (healthData.last_hospitalization && !healthData.reason_of_hospitalization) {
      errors.push("Reason for hospitalization is required if last hospitalization is specified.");
    }
  }
  return errors;
};

export const validatePrivacyConsent = (consent, submissionStatus) => {
  const errors = [];
  if (submissionStatus === 'submitted') {
    if (!consent.student) errors.push("Student is required.");
    if (consent.has_consented === false) {
      errors.push("Consent must be given before submission.");
    }
  }
  return errors;
};

export const validatePreviousSchool = (record, submissionStatus) => {
  const errors = [];
  if (submissionStatus === 'submitted') {
    const requiredFields = ['student_number', 'school', 'education_level', 'start_year', 'end_year'];
    requiredFields.forEach(field => {
      if (!record[field]) errors.push(`${field.replace(/_/g, ' ')} is required.`);
    });

    const currentYear = new Date().getFullYear();
    if (record.start_year && record.end_year && record.end_year < record.start_year) {
      errors.push("End year cannot be earlier than start year.");
    }
    if (record.start_year > currentYear || record.end_year > currentYear) {
      errors.push("Start or end year cannot be in the future.");
    }

    if (record.education_level === 'Senior High' && !record.senior_high_gpa) {
      errors.push("GPA is required for Senior High.");
    }

    if (record.education_level !== 'Senior High' && record.senior_high_gpa) {
      errors.push("GPA must not be provided for non-Senior High education levels.");
    }
  }
  return errors;
};


export const validatePersonalityTraits = (traits, submissionStatus) => {
  const errors = [];
  if (submissionStatus === 'submitted') {
    const requiredFields = [
      'student', 'enrollment_reason', 'degree_program_aspiration',
      'special_talents', 'musical_instruments', 'hobbies',
      'likes_in_people', 'dislikes_in_people'
    ];

    requiredFields.forEach(field => {
      if (!traits[field]) errors.push(`${field.replace(/_/g, ' ')} is required.`);
    });

    if (traits.degree_program_aspiration === false && !traits.aspiration_explanation) {
      errors.push("Aspiration explanation is required if degree program aspiration is false.");
    }
  }
  return errors;
};

export const validateFamilyRelationship = (relationship, submissionStatus) => {
  const errors = [];
  if (submissionStatus === 'submitted') {
    if (!relationship.student) errors.push("Student is required.");
    if (!relationship.closest_to) errors.push("Closest to is required.");

    if (relationship.closest_to === 'Other' && !relationship.specify_other) {
      errors.push("Please specify the relationship when 'Other' is selected.");
    }
  }
  return errors;
};

export const validateCounselingInfo = (info, submissionStatus) => {
  const errors = [];
  if (submissionStatus === 'submitted') {
    const requiredFields = [
      'student', 'personal_characteristics',
      'problem_confidant', 'confidant_reason', 'anticipated_problems'
    ];

    requiredFields.forEach(field => {
      if (!info[field]) errors.push(`${field.replace(/_/g, ' ')} is required.`);
    });

    if (info.previous_counseling) {
      if (!info.counseling_location) errors.push("Counseling location is required.");
      if (!info.counseling_reason) errors.push("Counseling reason is required.");
    }
  }
  return errors;
};
