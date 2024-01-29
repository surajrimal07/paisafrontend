import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for does not exist.</p>
        <Link to="/" className="home-button">Go back to the home page</Link>
      </div>
    </div>
  );
};

export default NotFound;