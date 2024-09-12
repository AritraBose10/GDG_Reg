import React from "react";
import "./SuccessPage.css"; // Assuming the CSS file contains your background styles

const SuccessPage = () => {
  return (
    <div className="success-wrapper">
      <div className="success-container">
        <h2 id="regis">Registration Successful!</h2>
        <p id="text">
          Thank you for registering for the GDG on Campus TIU Core Team
          Interview. If you are shortlisted, you will receive an email with the
          details about the interview.
        </p>
        <p>Best of luck!</p>
      </div>
    </div>
  );
};

export default SuccessPage;
