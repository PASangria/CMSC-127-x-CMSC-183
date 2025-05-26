import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import './css_pages/Help.css';
import { AuthContext } from '../context/AuthContext';

export const Help = () => {
    const { role } = React.useContext(AuthContext);
    return (
        <DefaultLayout variant={role}>
            <div className="admin-help-page">
                <h1 className="help-title">Help Page</h1>
                <p className="help-intro">
                    This page explains each section of the Basic Information Sheet (BIS) and the Student Cumulative Information File (SCIF). Refer to it as you complete your form to ensure all fields are properly filled out.
                </p>
                <section className="help-section" id="profile-setup">
                    <h2>Profile Setup Requirement</h2>
                    <div className="setup-info">
                        <p>
                            Before filling out the BIS or SCIF forms, you must first complete the Set Up data form. This setup is a multi-step profile form that collects the following information:
                        </p>
                        <details>
                            <summary>Personal Information</summary>
                            <ul>
                                <li>Basic identity details such as name, birthdate, contact information, and religion.</li>
                            </ul>
                        </details>

                        <details>
                            <summary>Educational Information</summary>
                            <ul>
                                <li>Your student number, college, degree program, year level, and date of initial entry.</li>
                            </ul>
                        </details>

                        <details>
                            <summary>Address Information</summary>
                            <ul>
                                <li>Your permanent address and current address while in UP, with an option to mark both as the same.</li>
                            </ul>
                        </details>
                        <p>
                            Completing this setup accurately is crucial as it enables the Office of Student Affairs to provide appropriate guidance and support throughout your studies. The setup form includes validation at each step and allows you to preview your information before submission.
                            After successfully submitting your profile setup, you will be able to access and complete the BIS and SCIF forms.
                        </p>
                    </div>
                </section>

                <section className="help-section" id="bis">
                    <h2>Basic Information Sheet (BIS)</h2>
                    <details>
                        <summary>Personal Data</summary>
                        <ul>
                            <li><strong>Student ID</strong> – Your unique student number.</li>
                            <li><strong>Full Name</strong> – Family Name, First Name, Middle Name.</li>
                            <li><strong>Nickname</strong> – Preferred short name or alias.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Program Information</summary>
                        <ul>
                            <li><strong>Program ID</strong> – System identifier of your program.</li>
                            <li><strong>Program Name</strong> – Official title (e.g., BA Psychology).</li>
                            <li><strong>Degree Description</strong> – A short description of your program focus or specialization.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Student-Program Relationship</summary>
                        <ul>
                            <li><strong>Enrollment ID</strong> – Internal reference to your program enrollment.</li>
                            <li><strong>Student ID</strong> – Must match your unique student number.</li>
                            <li><strong>Program ID</strong> – Tied to the program you're currently enrolled in.</li>
                            <li><strong>Year Level</strong> – Your current year in the program (e.g., 2nd Year).</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Socioeconomic Status & Means of Support</summary>
                        <ul>
                            <li><strong>Monthly Allowance</strong> – Estimated average monthly budget.</li>
                            <li><strong>Major Expenses</strong> – Common personal or academic-related expenses.</li>
                            <li><strong>Support Type</strong> – Source of funding (e.g., family, scholarship, job).</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Scholarship Information</summary>
                        <ul>
                            <li><strong>Scholarship Name</strong> – Full title of any scholarship(s) you receive.</li>
                            <li><strong>Privileges</strong> – Benefits provided (e.g., tuition waiver, stipend).</li>
                            <li><strong>Linked Information</strong> – Tied to your student record through a relationship table.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>School Preferences</summary>
                        <ul>
                            <li><strong>Reason for Enrolling</strong> – Your main reason for choosing this university or program.</li>
                            <li><strong>Transfer or Shift Plans</strong> – If you intend to transfer or shift, indicate reasons and timing.</li>
                            <li><strong>Previous Degree Shifts</strong> – Mention any prior program changes.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Present Scholastic Status</summary>
                        <ul>
                            <li><strong>Intended Senior High Course</strong> – Course you planned before university.</li>
                            <li><strong>UPCA First Choice</strong> – Your first choice when applying via UPCA.</li>
                            <li><strong>Admitted Course</strong> – The course you were actually accepted into.</li>
                            <li><strong>Next Plan</strong> – Any intention to shift or transfer from current course.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Record Information</summary>
                        <ul>
                            <li><strong>BIS Record ID</strong> – Internal system ID for this record.</li>
                            <li><strong>Signature</strong> – Must match your registered signature.</li>
                            <li><strong>Date Filled</strong> – When the form was completed.</li>
                            <li><strong>Date Signed</strong> – When the form was formally signed.</li>
                        </ul>
                    </details>
                </section>

                <section className="help-section" id="scif">
                    <h2>Student Cumulative Information File (SCIF)</h2>
                    <details>
                        <summary>Personal Info</summary>
                        <ul>
                            <li><strong>Student Number</strong> – Your official student number.</li>
                            <li><strong>Full Name</strong> – As registered in university records.</li>
                            <li><strong>Sex, Age, Religion</strong> – For demographic profiling.</li>
                            <li><strong>Birth Information</strong> – Date and place of birth.</li>
                            <li><strong>Contact Info</strong> – Address, email, phone (must be current and valid).</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Family Data</summary>
                        <ul>
                            <li><strong>Parents</strong> – Names, jobs, highest education, contact details.</li>
                            <li><strong>Siblings</strong> – Names, ages, schools/jobs, education levels.</li>
                            <li><strong>Guardian Info</strong> – Relationship to student, home language spoken.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Health Data</summary>
                        <ul>
                            <li><strong>General Health</strong> – Description of your overall physical condition.</li>
                            <li><strong>Physical Metrics</strong> – Height, weight, hearing/vision info.</li>
                            <li><strong>Medical Conditions</strong> – Known illnesses or disabilities.</li>
                            <li><strong>Hospitalization History</strong> – Past major hospitalizations or treatments.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Previous School Record</summary>
                        <ul>
                            <li><strong>Education History</strong> – Schools attended from primary through tertiary.</li>
                            <li><strong>Years Attended</strong> – Inclusive years per school.</li>
                            <li><strong>Honors & GPA</strong> – Academic distinctions or achievements, general average (if available).</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Scholarships and Financial Assistance</summary>
                        <ul>
                            <li><strong>Scholarship/Assistance Name</strong> – Title of financial support programs.</li>
                            <li><strong>Details</strong> – Source, coverage, duration.</li>
                            <li><strong>Linked Record</strong> – Matched with your student profile.</li>
                        </ul>
                    </details>
                    <details>
                        <summary>Organizational Membership, Awards, Psychometrics (Future Use)</summary>
                        <ul>
                            <li><strong>Organizations</strong> – List of student orgs you’re affiliated with.</li>
                            <li><strong>Awards</strong> – Academic or extracurricular awards received.</li>
                            <li><strong>Psychometrics</strong> – This will be collected in a future form; leave blank for now.</li>
                        </ul>
                    </details>
                </section>

                <section className="help-section" id="notes">
                    <h2>Notes</h2>
                    <ul>
                        <li>Fields marked with <strong>*</strong> are required and cannot be left blank.</li>
                        <li>Ensure the accuracy of all data before submitting your forms.</li>
                        <li>If you are unsure about a field, consult your college registrar or guidance office for clarification.</li>
                    </ul>
                </section>
            </div>
        </DefaultLayout>
    );
}
