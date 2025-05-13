<>
<div className="PDF-Header">
    <div className="PDF-Header-Left">
        <img src="..\..\assets\react.svg"></img>
        <p>OSA-CTS Form No. 02</p>
        <p>Revised 2022</p>
    </div>
   <div class="PDF-Header-Center"> <h1>UNIVERSITY OF THE PHILIPPINES MINDANAO</h1>
    <h3>Office of the Student Affaird</h3>
    <h3>COUNSELING AND TESTING SECTION</h3>
    <h5>Mintal, Tugbok District, Davao City 8022, Philippines</h5>
    <h5>Telefax: 082293-1353, 0918-918-4934 • Email:cts_osa.upmindanao@up.edu.ph</h5> </div>
    <div className="PDF-Header-Right">
        <img src="..\..\assets\upmin-logo.svg"></img>
    </div>
</div>
<div className="PDF-main">
    <h2>BASIC INFORMATION SHEET</h2>
    <p>Note: Please PROVIDE the information asked for. The data contained in this form will be kept confidential and will serve as your record. Please fill in the 
blanks carefully and sincerely</p>
    <div class="PDF-Section1">
        <h2>I. PERSONAL DATA</h2>
        <section className="print-style">
        <p>
          1 Name: <span className="underline">{`${profileData.last_name}, ${profileData.first_name} ${profileData.middle_name}`}</span> 
          2 Nick Name: <span className="underline">{profileData.nickname}</span> 
          3 Year & Course: <span className="underline">{`${profileData.current_year_level} - ${profileData.degree_program}`}</span>
        </p>
        <p>(Pls. Print) Family, First Mid</p>
      </section>
    </div>
    <div class="PDF-Section2">
        <h2>II. SOCIO-ECONOMIC STATUS</h2>
          <section className="print-style">
        <p>
          4 What is your means of support for your college education? 
          </p>
      </section>
    </div>
</div>
</>