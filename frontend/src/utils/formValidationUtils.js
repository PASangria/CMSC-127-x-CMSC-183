const studentNumberPattern = /^\d{4}-\d{5}$/;
const phonePattern = /^\+?\d{9,15}$/;

export const validateStep = (step, formData, sameAsPermanent = false) => {
  switch (step) {
    case 1: // Personal Info
      return validatePersonalInfo(formData);

    case 2: // Education
      return validateEducation(formData);

      case 3: // Permanent Address
      return validateAddress({
        line1: formData.permanent_address_line_1,
        barangay: formData.permanent_barangay,
        city_municipality: formData.permanent_city_municipality,
        province: formData.permanent_province,
        region: formData.permanent_region,
        zip: formData.permanent_zip_code,
      });
    

    case 4: // UP Address
      if (sameAsPermanent) return true;
      return validateAddress({
        line1: formData.up_address_line_1,
        barangay: formData.up_barangay,
        city_municipality: formData.up_city_municipality,
        province: formData.up_province,
        region: formData.up_region,
        zip: formData.up_zip_code,
      });

    case 5:
      return true;

    default:
      return false;
  }
};

function validatePersonalInfo(data) {
  const requiredFields = [
    'family_name',
    'first_name',
    'birth_rank',
    'birthMonth',
    'birthDay',
    'birthYear',
    'birth_place',
    'mobile_number',
    'sex',
  ];

  const allRequiredFilled = requiredFields.every(field => !!data[field]);

  const validMobile = phonePattern.test(data.mobile_number);
  const validLandline = !data.landline_number || phonePattern.test(data.landline_number);

  const birthRankValid = parseInt(data.birth_rank) > 0;

  return allRequiredFilled && validMobile && validLandline && birthRankValid;
}

function validateEducation(data) {
  const validStudentNumber = studentNumberPattern.test(data.student_number);
  const requiredFields = ['college', 'degreeProgram', 'current_year_level'];

  const allRequiredFilled = requiredFields.every(field => !!data[field]);

  return validStudentNumber && allRequiredFilled;
}

function validateAddress(address) {
  return (
    !!address.line1 &&
    !!address.barangay &&
    !!address.city_municipality &&
    !!address.province &&
    !!address.region &&
    !!address.zip
  );
}
