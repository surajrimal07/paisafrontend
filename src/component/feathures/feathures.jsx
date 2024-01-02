import React from 'react';

const FeaturesPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <h2>Explore the Features of 10paisa Intelligent Financial App</h2>
          <p>Discover how our app can empower you to achieve financial success with its advanced features.</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Intelligent Budgeting</h3>
              <p className="card-text">
                Create and stick to a personalized budget based on your financial goals. Our intelligent budgeting feature
                ensures you stay on track and achieve your financial milestones.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Smart Investments</h3>
              <p className="card-text">
                Explore intelligent investment options tailored to your risk tolerance and financial aspirations.
                Make informed investment decisions with our smart investment tools.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Real-time Analytics</h3>
              <p className="card-text">
                Stay updated with real-time analytics and insights into your spending and investment patterns.
                Make data-driven decisions to optimize your financial strategy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">User-Friendly Interface</h3>
              <p className="card-text">
                Our app features an intuitive and user-friendly interface, making financial management
                easy and accessible for users of all experience levels.
              </p>
            </div>
          </div>
        </div>

        {/* Add more feature cards as needed */}
      </div>
    </div>
  );
};

export default FeaturesPage;
