import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <h2>About 10paisa Intelligent Financial App</h2>
          <p>Welcome to the future of intelligent financial management with 10paisa!</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Our Mission</h3>
          <p>
            At 10paisa, our mission is to empower individuals to make informed and strategic financial decisions.
            We believe that everyone deserves access to intelligent financial tools that simplify and enhance their financial journey.
          </p>
        </div>

        <div className="col-md-6">
          <h3>Our Vision</h3>
          <p>
            Our vision is to create a world where financial management is seamless, intelligent, and accessible to all.
            Through cutting-edge technology and innovative solutions, we aim to revolutionize the way people approach their finances.
          </p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Key Features</h3>
          <ul>
            <li>Intelligent Budgeting: Our app helps you create and stick to a personalized budget based on your financial goals.</li>
            <li>Smart Investments: Explore intelligent investment options tailored to your risk tolerance and financial aspirations.</li>
            <li>Real-time Analytics: Stay updated with real-time analytics and insights into your spending and investment patterns.</li>
            <li>User-Friendly Interface: Our intuitive interface makes managing your finances a breeze, even for beginners.</li>
          </ul>
        </div>

        <div className="col-md-6">
          <h3>Meet the Team</h3>
          <p>
            Behind every line of code and every innovative feature is a dedicated team of professionals passionate about
            transforming the financial landscape. Meet the individuals driving the 10paisa vision forward.
          </p>
          {/* You can add team members' details and images here */}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h3>Contact Us</h3>
          <p>
            Have questions or suggestions? We'd love to hear from you! Reach out to our team at <a href="mailto:info@10paisa.com">info@10paisa.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
