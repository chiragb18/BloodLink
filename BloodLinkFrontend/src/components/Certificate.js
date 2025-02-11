import React from 'react';
import html2pdf from 'html2pdf.js';

const Certificate = ({ donorName, bloodType, donationDate }) => {
  const generateCertificate = () => {
    const element = document.getElementById("certificate");
    html2pdf(element);
  };

  return (
    <div className="container mt-4">
      <div className="certificate" id="certificate" style={certificateStyle}>
        <h2 className="text-center">Certificate of Donation</h2>
        <p className="text-center">This is to certify that</p>
        <h3 className="text-center" style={{ fontWeight: 'bold' }}>{donorName}</h3>
        <p className="text-center">has made a blood donation of type</p>
        <h4 className="text-center" style={{ fontWeight: 'bold' }}>{bloodType}</h4>
        <p className="text-center">on {donationDate}</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-4" onClick={generateCertificate}>Download Certificate</button>
        </div>
      </div>
    </div>
  );
};

const certificateStyle = {
  border: '2px solid #4CAF50',
  padding: '30px',
  borderRadius: '10px',
  width: '80%',
  margin: '0 auto',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
};

export default Certificate;
