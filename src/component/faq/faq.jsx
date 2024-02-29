import React from 'react';

const FAQ = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">

        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading1">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse1"
              aria-expanded="true"
              aria-controls="faqCollapse1"
            >
              What is 10 Paisa Investment App?
            </button>
          </h2>
          <div
            id="faqCollapse1"
            className="accordion-collapse collapse show"
            aria-labelledby="faqHeading1"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              10 Paisa Investment App is a user-friendly platform that allows users to invest and manage their financial portfolio easily. It provides various features such as portfolio tracking, real-time market updates, and more.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading2">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse2"
              aria-expanded="false"
              aria-controls="faqCollapse2"
            >
              How can I create an account?
            </button>
          </h2>
          <div
            id="faqCollapse2"
            className="accordion-collapse collapse"
            aria-labelledby="faqHeading2"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              To create an account, visit our website and click on the "Sign Up" button. Follow the instructions to provide the necessary information and complete the registration process.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading3">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse3"
              aria-expanded="false"
              aria-controls="faqCollapse3"
            >
              Can I invest with a small amount?
            </button>
          </h2>
          <div
            id="faqCollapse3"
            className="accordion-collapse collapse"
            aria-labelledby="faqHeading3"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, the 10 Paisa Investment App allows users to invest with a small amount. We believe in making investing accessible to everyone, regardless of their budget.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
