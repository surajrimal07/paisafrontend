import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import RegisterUser from '../apis/api.js';

const HomePage = () => {
  const fadeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  useEffect(() => {
    RegisterUser().then((res) => {
      console.log(res.data)

    })
  },[])


  return (
    <animated.div style={fadeAnimation} className="container mt-5">
      <header className="text-center mb-5">
        <h1>Welcome to SmartInvest</h1>
        <p className="lead">Your Gateway to Smart and Secure Investments</p>
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
      </header>

      <section className="mb-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <div className="row">
          <div className="col-lg-4">
            <h3>Secure Investments</h3>
            <p>Our platform ensures the security of your investments through advanced encryption.</p>
          </div>
          <div className="col-lg-4">
            <h3>Smart Portfolio Management</h3>
            <p>Optimize your portfolio with intelligent investment strategies tailored to your goals.</p>
          </div>
          <div className="col-lg-4">
            <h3>User-Friendly Interface</h3>
            <p>Intuitive and easy-to-use interface for a seamless investment experience.</p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-center mb-4">Investment Options</h2>
        <div className="row">
          <div className="col-lg-4">
            <h3>Stock Market</h3>
            <p>Diversify your investments by exploring opportunities in the stock market.</p>
          </div>
          <div className="col-lg-4">
            <h3>Cryptocurrency</h3>
            <p>Stay ahead of the curve with investments in the rapidly evolving cryptocurrency market.</p>
          </div>
          <div className="col-lg-4">
            <h3>Real Estate</h3>
            <p>Explore real estate investment opportunities for long-term growth.</p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-center mb-4">What Our Users Say</h2>
        <div className="row">
          <div className="col-lg-4">
            <blockquote className="blockquote">
              <p className="mb-0">SmartInvest helped me diversify my portfolio and achieve my financial goals.</p>
              <footer className="blockquote-footer">John Doe</footer>
            </blockquote>
          </div>
          <div className="col-lg-4">
            <blockquote className="blockquote">
              <p className="mb-0">The user interface is incredibly easy to navigate, even for beginners.</p>
              <footer className="blockquote-footer">Jane Smith</footer>
            </blockquote>
          </div>
          <div className="col-lg-4">
            <blockquote className="blockquote">
              <p className="mb-0">I appreciate the emphasis on security and data protection.</p>
              <footer className="blockquote-footer">Michael Johnson</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2>Start Investing Today</h2>
        <p>Join SmartInvest and embark on your journey to financial success.</p>
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
      </section>
    </animated.div>
  );
};

export default HomePage;
