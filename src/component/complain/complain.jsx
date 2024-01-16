import React from 'react';

const Complaint = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">File a Complaint</h2>

      <p>
        We value your feedback and take complaints seriously. If you have any concerns or issues with the 10Paisa Smart Investment App, please reach out to us by email at <a href="mailto:complain@10paisa.com">complain@10paisa.com</a>.
      </p>

      <p>
        When filing a complaint, please provide the following information:
      </p>

      <ul>
        <li>Your full name</li>
        <li>Contact information (email address and phone number)</li>
        <li>Description of the complaint, including relevant details</li>
        <li>Any supporting documentation or evidence</li>
      </ul>

      <p>
        Our team will review your complaint and work to address the issue promptly. We appreciate your patience and cooperation in helping us improve our services.
      </p>

      <p>
        Thank you for using the 10Paisa Smart Investment App.
      </p>
    </div>
  );
};

export default Complaint;
