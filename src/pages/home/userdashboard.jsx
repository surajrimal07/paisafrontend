import React, { useEffect, useState } from 'react';
import { FaCubes, FaDollarSign, FaMoneyBill, FaMoneyCheck, FaUser } from 'react-icons/fa';
import { getPortfolio } from '../../apis/api.js';

import './user.css';

const UserDashboard = () => {
  const [userPort, setUserPort] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem('user'));

        setUserData(storedUserData);

        if (storedUserData) {
          const port = await getPortfolio(storedUserData.email);

          if (port.status === 200) {
            console.log('Portfolio:', port.data);
            setUserPort(port.data);
          } else {
            console.error('Error fetching portfolio');
          }
        } else {
          console.error('User data not found in local storage');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchPortfolio();
  }, []);

  const handleMenuOptionClick = (action) => {
    console.log('Selected option:', action);
    setShowOptions(false);
  };

  if (!userPort || !userData || loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

//countings for the dashboard
const totalPortfolios = userPort && userPort.portfolio ? userPort.portfolio.length : 0;
const totalStockUnits = userPort && userPort.portfolio ? userPort.portfolio.reduce((total, portfolio) => total + (portfolio.totalunits || 0), 0) : 0;
const totalPortfolioValue = userPort && userPort.portfolio ? userPort.portfolio.reduce((total, portfolio) => total + (portfolio.portfoliovalue || 0), 0) : 0;
const totalPortfolioCost = userPort && userPort.portfolio ? userPort.portfolio.reduce((total, portfolio) => total + (portfolio.portfoliocost || 0), 0) : 0;

const InfoCard = ({ icon, value, label }) => {
  return (
    <div className="info-card-container">
      <div className="info-card">
        <div className="info-item">
          {icon && <div className="info-icon">{icon}</div>}
          <div className="info-text">
            <div className="info-value">{value}</div>
            <div className="info-label">{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="user-dashboard">
      <div className="user-info">
        <img src={userData.dpImage} alt="User DP" />
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
        <p>{userData.phone}</p>
        <p>Balance: Rs {userData.userAmount}</p>
      </div>

      <div className="user-info-cards">
          <InfoCard icon={<FaCubes />} value={totalStockUnits} label="Total Stock Units" />
          <InfoCard icon={<FaDollarSign />} value={`Rs ${totalPortfolioValue}`} label="Total Portfolio Value" />
          <InfoCard icon={<FaUser />} value={`Rs ${totalPortfolioCost}`} label="Total Portfolio Cost" />
          <InfoCard icon={<FaMoneyBill />} value={`Rs ${totalPortfolioValue - totalPortfolioCost}`} label="Total Net Gain/Loss" />
          <InfoCard icon={<FaMoneyCheck />} value={` ${totalPortfolios}`} label="Your Portfolio" />

        </div>

      <div className="portfolio">
        {userPort.portfolio && userPort.portfolio.map((portfolioItem) => (
          <div key={portfolioItem._id} className="portfolio-item">
            <div className="portfolio-header">
              <h4>Name: {portfolioItem.name}</h4>
              <div className="portfolio-menu">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMenuOptionClick(portfolioItem._id, 'RenamePortfolio')}
                    >
                      Rename Portfolio
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMenuOptionClick(portfolioItem._id, 'AddStock')}
                    >
                      Add Stock
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMenuOptionClick(portfolioItem._id, 'RemoveStock')}
                    >
                      Remove Stock
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMenuOptionClick(portfolioItem._id, 'DeletePortfolio')}
                    >
                      Delete Portfolio
                    </button>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
            </div>

            {portfolioItem.totalunits !== undefined && (
              <p>Total Units: {portfolioItem.totalunits}</p>
            )}
            {portfolioItem.portfoliocost !== undefined && (
              <p>Portfolio Cost: Rs {portfolioItem.portfoliocost}</p>
            )}

            {portfolioItem.portfoliovalue !== undefined && (
              <p>Portfolio Value: Rs {portfolioItem.portfoliovalue}</p>
            )}

            {portfolioItem.stocks && portfolioItem.stocks.length > 0 ? (
              <div className="stocks">
                <h4>Stocks</h4>
                {portfolioItem.stocks.map((stock) => (
                  <div key={stock._id} className="stock">
                    <p>Symbol: {stock.symbol}</p>
                    <p>Quantity: {stock.quantity}</p>
                    <p>Wacc: {stock.wacc}</p>
                    <p>Last Price: Rs {stock.ltp}</p>
                    <p>Costprice: Rs {stock.costprice}</p>
                    <p>Current Price: Rs {stock.currentprice}</p>
                    <p>Net Gain/Loss: Rs {stock.netgainloss}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No stocks available for this portfolio.</p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;


