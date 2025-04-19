import React from 'react';
import './Footer.css'; // Import CSS for styling
import logo from '../assets/UPMin_logo.png'; // Adjust the path to your logo file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-header">
        <img src={logo} alt="UP Mindanao Logo" className="footer-logo" />
        <div className="footer-title-container">
          <h3 className="footer-title-small">University of the Philippines</h3>
          <h2 className="footer-title-large">MINDANAO</h2>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <h4>ABOUT US</h4>
          <ul>
            <li><a href="https://www.upmin.edu.ph/colleges-and-schools/">COLLEGES AND SCHOOLS</a></li>
            <li><a href="https://www.upmin.edu.ph/">VISIT OUR CAMPUS</a></li>
            <li><a href="https://www.upmin.edu.ph/quick-links/contact-us/">CONTACT US</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>FOR CURRENT STUDENTS</h4>
          <ul>
            <li><a href="https://www.upmin.edu.ph/academics/academic-programs/">ACADEMIC PROGRAMS</a></li>
            <li><a href="https://student.upmin.edu.ph/index.php?go=login">CSRS FOR STUDENTS</a></li>
            <li><a href="https://www.upmin.edu.ph/students/student-policies/">STUDENT POLICIES</a></li>
            <li><a href="https://www.upmin.edu.ph/academics/scholarships/">SCHOLARSHIPS</a></li>
            <li><a href="https://www.upmin.edu.ph/students/downloads/">DOWNLOADABLE FORMS</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>FOR TEACHING AND NONTEACHING STAFF</h4>
          <ul>
            <li><a href="https://adviser.upmin.edu.ph/index.php?go=login">CSRS FOR FACULTY</a></li>
            <li><a href="https://www.upmin.edu.ph/?page_id=9939">CITIZEN'S CHARTER</a></li>
            <li><a href="https://www.upmin.edu.ph/?page_id=9943">UNIVERSITY POLICIES</a></li>
            <li><a href="https://www.upmin.edu.ph/students/downloads/">DOWNLOADABLE FORMS</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>UP WEBSITES</h4>
          <ul>
            <li><a href="https://upd.edu.ph/">SYSTEM</a></li>
            <li><a href="https://upd.edu.ph/">DILIMAN</a></li>
            <li><a href="https://uplb.edu.ph/">LOS BAÑOS</a></li>
            <li><a href="https://www1.upm.edu.ph/">MANILA</a></li>
            <li><a href="https://www.upv.edu.ph/">VISAYAS</a></li>
            <li><a href="https://www.upou.edu.ph/home/">OPEN UNIVERSITY</a></li>
            <li><a href="https://www2.upb.edu.ph/">BAGUIO</a></li>
            <li><a href="https://www.upcebu.edu.ph/">CEBU</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 University of the Philippines Mindanao. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;