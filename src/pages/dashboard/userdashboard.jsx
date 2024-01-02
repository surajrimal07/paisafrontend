import React, { useEffect, useState } from 'react';

const MyProfilePage = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // Function to mask the password
  const maskPassword = (password) => {
    return '*'.repeat(password.length);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <h2>My Profile</h2>
        </div>
      </div>

      {userData && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <img className="card-img-top" src={userData.dpImage} alt="User DP" />
              <div className="card-body">
                <h5 className="card-title">{userData.name}</h5>
                <p className="card-text">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col">
                    <h4>Personal Information</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Password:</strong> {maskPassword(userData.pass)}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Amount:</strong> ${userData.userAmount}</p>
                    <p><strong>Portfolio:</strong> {userData.portfolio.length} assets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
