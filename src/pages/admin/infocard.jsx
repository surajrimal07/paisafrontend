import React from 'react';
import { FaCubes, FaDollarSign, FaUser, FaUsersCog } from 'react-icons/fa';
import './InfoCard.css';

const InfoCard = ({ totalUsers, totalAssets, totalAmount, totalAdmins }) => {
  return (
    <div className="info-card-container">
      <div className="info-card">
        <div className="info-item">
          <FaUser className="info-icon" />
          <div className="info-text">
            <div className="info-value">{totalUsers}</div>
            <div className="info-label">Total Users</div>
          </div>
        </div>
        <div className="info-item">
          <FaCubes className="info-icon" />
          <div className="info-text">
            <div className="info-value">{totalAssets}</div>
            <div className="info-label">Total Assets</div>
          </div>
        </div>
        <div className="info-item">
          <FaDollarSign className="info-icon" />
          <div className="info-text">
          <div className="info-value">
              Rs {totalAmount.toLocaleString()} {/* Display totalAmount with Rs symbol */}
            </div>
            <div className="info-label">Total Amount</div>
          </div>
        </div>
        <div className="info-item">
          <FaUsersCog className="info-icon" />
          <div className="info-text">
            <div className="info-value">{totalAdmins}</div>
            <div className="info-label">Total Admins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
