import React from 'react';
import './css/pdfStyle.css';
import upLogo from "../assets/UP-Seal-Line.png";
import upLogoLeft from '../assets/UPMin_logo.png';

const FormHeader = () => {
  return (
    <div className="pdfHeader">
      <div className="left">
        <img src={upLogo} alt="UP Logo" />
      </div>
      <div className="center">
        <h2>
          UNIVERSITY OF THE PHILIPPINES MINDANAO<br />
          Office of Student Affairs<br />
          COUNSELING AND TESTING SECTION
        </h2>
        <p>
          Mintal, Tugbok District, Davao City 8022, Philippines<br />
          Telefax: 082-293-1353, 0918-918-4934 • Email: cts_osa.upmindanao@up.edu.ph
        </p>
      </div>
      <div className="right">
         <img src={upLogoLeft} alt="UP Logo" />
      </div>
    </div>
  );
};

export default FormHeader;
