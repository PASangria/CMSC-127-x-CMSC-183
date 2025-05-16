const [formData, setFormData] = useState({
  familyData: {
    mother: {
      first_name: '',
      last_name: '',
      age: '',
      job_occupation: '',
      company_agency: '',
      company_address: '',
      highest_educational_attainment: '',
      contact_number: ''
    },
    father: {
      first_name: '',
      last_name: '',
      age: '',
      job_occupation: '',
      company_agency: '',
      company_address: '',
      highest_educational_attainment: '',
      contact_number: ''
    },
    guardian: {
      first_name: '',
      last_name: '',
      contact_no: '',
      address: '',
      relationship_to_guardian: '',
      language_dialect: []
    },
  },
  siblings: [
  {
    first_name: '',
    last_name: '',
    sex: '',
    age: '',
    job_occupation: '',
    company_school: '',
    educational_attainment: '',
    students: [],
  }
],

  health_data: {
    health_condition: '',
    height: '',
    weight: '',
    eye_sight: '',
    hearing: '',
    physical_disabilities: [],
    common_ailments: [],
    last_hospitalization: '',
    reason_of_hospitalization: ''
  },
   previous_school_record: [
    {
      school: {
        name: '',
        school_address: {
          address_line_1: '',
          barangay: '',
          city_municipality: '',
          province: '',
          region: '',
          zip_code: ''
        }
      },
      education_level: '',
      start_year: '',
      end_year: '',
      honors_received: '',
      senior_high_gpa: ''
    }
  ],
  scholarship: [],
  personality_traits: {
    enrollment_reason: '',
    degree_program_aspiration: null,
    aspiration_explanation: '',
    special_talents: '',
    musical_instruments: '',
    hobbies: '',
    likes_in_people: '',
    dislikes_in_people: ''
  },
  family_relationship: {
    closest_to: '',
    specify_other: ''
  },
    counseling_info: {
    personal_characteristics: '',
    problem_confidant: '',
    confidant_reason: '',
    anticipated_problems: '',
    previous_counseling: false,
    counseling_location: '',
    counseling_reason: ''
  },
  privacy_consent: {
    has_consented: true
  }
});
