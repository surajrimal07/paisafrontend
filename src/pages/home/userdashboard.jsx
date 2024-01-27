import React, { useEffect, useState } from 'react';
import { FaCubes, FaDollarSign, FaMoneyBill, FaMoneyCheck, FaPlus, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { addStockToPortfolio, createPortfolio, deletePortfolio, getPortfolio, removeStockFromPortfolio, renamePortfolio } from '../../apis/api.js';
import NoImage from '../wishlist/a.png';
import HandleAddStock from './handleaddstock';
import HandleCreate from './handlecreate';
import HandleDelete from './handledelete';
import HandleRemoveStock from './handledeletestock';
import HandleRename from './handlerename';

import './user.css';

const UserDashboard = () => {
  const [userPort, setUserPort] = useState([]);
  const [userData, setUserData] = useState(null);
  const [totalStocksCount, setTotalStocksCount] = useState(0);
  const [portfolioStockCounts, setPortfolioStockCounts] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddStockDialog, setshowAddStockDialog] = useState(false);
  const [showRemoveStockDialog, setRemoveStockDialog] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedPortfolioName, setSelectedPortfolioName] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);


  const fetchPortfolio = async () => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem('user'));

      setUserData(storedUserData);

      if (storedUserData) {
        const port = await getPortfolio(storedUserData.email);

        if (port.status === 200) {
          const stockCounts = {};
          port.data.portfolio.forEach((portfolio) => {
            stockCounts[portfolio._id] = portfolio.stocks ? portfolio.stocks.length : 0;
          });

          setPortfolioStockCounts(stockCounts);

          const allStocks = port.data.portfolio.reduce(
            (acc, portfolioItem) => acc.concat(portfolioItem.stocks || []),
            []
          );
          setTotalStocksCount(allStocks.length);

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

  useEffect(() => {
    fetchPortfolio();
  }, []);

  //handle code
//create portfolio
const handleMenuToggle = () => {
  setShowCreateDialog(true);
};

const handleRenameClick = (portfolioId,portfolioName ) => {
  setSelectedPortfolio(portfolioId);
  setSelectedPortfolioName(portfolioName);
  setShowRenameDialog(true);
};

const handleDeleteClick = (portfolioId, portfolioName) => {
  setSelectedPortfolio(portfolioId);
  setSelectedPortfolioName(portfolioName);
  setShowDeleteDialog(true);
};

const handleAddStockClick = (portfolioId,portfolioName ) => {
  setSelectedPortfolio(portfolioId);
  setSelectedPortfolioName(portfolioName);
  setshowAddStockDialog(true);
  };

const handleRemoveStockClick = (portfolioId,portfolioName, stocks) => {
  setSelectedPortfolio(portfolioId);
  setSelectedPortfolioName(portfolioName);
  const stockSymbols = stocks.map(stock => stock.symbol);
  setSelectedStock(stockSymbols);
  setRemoveStockDialog(true);

  console.log('Selected stock:', stocks);
  console.log(selectedStock);
  };

const getStockLTP = (stockSymbol) => {
  const assets = JSON.parse(localStorage.getItem('Assets'));

  if (assets) {
    const stockData = assets.find(stock => stock.symbol === stockSymbol);

    if (stockData && stockData.ltp !== undefined) {
      return ` Rs ${stockData.ltp}`;
    }
  }

  return '';
};

//save functions
const handleCreateSave = async (event, email, portfolioname) => {
  event.preventDefault();

  try {
    const res = await createPortfolio(email, portfolioname);
    const { success, message } = res.data;

    if (success) {
      toast.success(message);

      await fetchPortfolio();
    } else {
      toast.error(message);
    }
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An error occurred.';
    toast.error(errorMessage);
  }

  setShowCreateDialog(false);
};

//handle delete save
const handleDeleteSave = async (event, email, id) => {
  event.preventDefault();

  try {
    const res = await deletePortfolio({ email, id });
    const { success, message } = res.data;

    if (success) {
      toast.success(message);
      await fetchPortfolio();
    } else {
      toast.error(message);
    }
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An error occurred.';
    toast.error(errorMessage);
  }

  setShowDeleteDialog(false);
};

const handleRenameSave = async (event, email, id, newName) => {
  event.preventDefault();

  try {
    const res = await renamePortfolio({ email, id, newName });
    const { success, message } = res.data;

     if (success) {
      toast.success(message);
      await fetchPortfolio();
    } else {
      toast.error(message);
    }
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An error occurred.';
    toast.error(errorMessage);
  }

  setShowRenameDialog(false);
};

const handleAddStockSave = async (event, email, id, symboll, quantityy, price) => {
  event.preventDefault();

  try {
    const res = await addStockToPortfolio({ email, id, symboll, quantityy, price });
    const { success, message } = res.data;

     if (success) {
      toast.success(message);
      await fetchPortfolio();
    } else {
      toast.error(message);
    }
  } catch (err) {
  const errorMessage =
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : 'An error occurred.';
  toast.error(errorMessage);
}

setshowAddStockDialog(false);
};

//handle remove stock save
const handleRemoveStockSave = async (event, email, id, symbol, quantity) => {
event.preventDefault();

try {
  const res = await removeStockFromPortfolio({ email, id, symbol, quantity });
  const { success, message } = res.data;

   if (success) {
    toast.success(message);
    await fetchPortfolio();
  } else {
    toast.error(message);
  } } catch (err) {
  const errorMessage =
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : 'An error occurred.';
  toast.error(errorMessage);
}

setRemoveStockDialog(false);
};


//handle cancel
const handleRenameCancel = () => {
  setShowRenameDialog(false);
};

const handleCreateCancel = () => {
  setShowCreateDialog(false);
  };

  const handleDeleteCancel = () => {
      setShowDeleteDialog(false);
  };

const handleAddStockCancel = () => {
  setshowAddStockDialog(false);
};

const handleRemoveStockCancel = () => {
  setRemoveStockDialog(false);
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
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Balance: Rs {userData.userAmount}</p>
      </div>

      <div className="user-info-cards">
          <InfoCard icon={<FaCubes />} value={totalStockUnits} label="Total Stock Units" />
          <InfoCard icon={<FaDollarSign />} value={`Rs ${totalPortfolioValue}`} label="Total Portfolio Value" />
          <InfoCard icon={<FaUser />} value={`Rs ${totalPortfolioCost}`} label="Total Portfolio Cost" />
          <InfoCard
  icon={<FaMoneyBill />}
  value={
    <span style={{ color: totalPortfolioValue - totalPortfolioCost >= 0 ? 'green' : 'red' }}>
      Rs {totalPortfolioValue - totalPortfolioCost >= 0 ? '' : '-'}
      {Math.abs(totalPortfolioValue - totalPortfolioCost)}
    </span>
  }
  label="Total Net Gain/Loss"
/>
          <InfoCard icon={<FaMoneyCheck />} value={` ${totalPortfolios}`} label="Total Portfolios" />
          <InfoCard icon={<FaCubes />} value={totalStocksCount} label="Total Stocks" />
        </div>

      <div className="portfolio">
        {userPort.portfolio && userPort.portfolio.map((portfolioItem) => (
          <div key={portfolioItem._id} className="portfolio-item">
            <div className="portfolio-header">
              <h4>Name: {portfolioItem.name}</h4>
              <div className="portfolio-menu">
              <button
  type="button"
  className="btn btn-sm btn-outline-secondary btn-hover-blue"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  Options
</button>

                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleRenameClick(portfolioItem._id, portfolioItem.name)}
                    >
                      Rename Portfolio
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleAddStockClick(portfolioItem._id, portfolioItem.name)}
                    >
                      Add Stock
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleRemoveStockClick(portfolioItem._id, portfolioItem.name, portfolioItem.stocks)}
                    >
                      Remove Stock
                    </button>
                  </li>
                  <li>
                  <button
  className="dropdown-item"
  onClick={() => handleDeleteClick(portfolioItem._id, portfolioItem.name)}
>
  Delete Portfolio
</button>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
            </div>

            {portfolioItem.totalunits !== undefined && portfolioItem.stocks && portfolioItem.stocks.length > 0 && (
              <p>Total Units: {portfolioItem.totalunits}</p>
            )}
            {portfolioItem.portfoliocost !== undefined &&  portfolioItem.stocks && portfolioItem.stocks.length > 0 &&(
              <p>Portfolio Cost: Rs {portfolioItem.portfoliocost}</p>
            )}

            {portfolioItem.portfoliovalue !== undefined && portfolioItem.stocks && portfolioItem.stocks.length > 0 &&(
              <p>Portfolio Value: Rs {portfolioItem.portfoliovalue}</p>
            )}

{portfolioItem.portfoliovalue !== undefined && portfolioItem.stocks && portfolioItem.stocks.length > 0 && (
  <p>
    Profit / Loss: <span className={portfolioItem.portfoliovalue - portfolioItem.portfoliocost >= 0 ? 'profit' : 'loss'}>
      Rs {portfolioItem.portfoliovalue - portfolioItem.portfoliocost}
    </span>
  </p>
)}

            {portfolioItem.stocks && portfolioItem.stocks.length > 0 ? (

              <div className="stocks">
                <h4>Assets: {portfolioStockCounts[portfolioItem._id]|| 0} Companies</h4>
                {portfolioItem.stocks.map((stock) => (
                  <div key={stock._id} className="stock">
                    <p>Symbol: {stock.symbol}</p>
                    <p>Quantity: {stock.quantity}</p>
                    <p>Wacc: {stock.wacc}</p>
                    <p>Last Price: Rs {stock.ltp}</p>
                    <p>Costprice: Rs {stock.costprice}</p>
                    <p>Current Price: Rs {stock.currentprice}</p>
                    <p>
          Net Gain/Loss: <span className={stock.netgainloss >= 0 ? 'profit' : 'loss'}>
            Rs {stock.netgainloss}
          </span>
        </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
              <img
                src={NoImage}
                alt="No stocks available"
                height={100}
                width={100}
                style={{ display: 'block', margin: 'auto' }}
              />
              <p>No Stocks found</p>
            </div>
            )}

          </div>
        ))}

<div className="floating-icon">
            <div className="icon-container" onClick={handleMenuToggle}>
              <FaPlus size={30} color="#fff" />
            </div>

            {showAddStockDialog && (
          <HandleAddStock
          userEmail={userData.email}
          portfolioId={selectedPortfolio}
          portfolioName= {selectedPortfolioName}
            onAdd={handleAddStockSave}
            onCancel={handleAddStockCancel}
          />
        )}

  {showRenameDialog && (
  <HandleRename
    userEmail={userData.email}
    portfolioId={selectedPortfolio}
    portfolioName= {selectedPortfolioName}
    onSave={handleRenameSave}
    onCancel={handleRenameCancel}
  />
)}

{showCreateDialog && (
        <HandleCreate
          userEmail={userData.email}
          onSave={handleCreateSave}
          onCancel={handleCreateCancel}
        />
      )}

{showRemoveStockDialog && (
  <HandleRemoveStock
    userEmail={userData.email}
    watchlistId={selectedPortfolio}
    portfolioName= {selectedPortfolioName}
    stocks= {selectedStock}
    onSave={handleRemoveStockSave}
    onCancel={handleRemoveStockCancel}
  />
)}
  {showDeleteDialog && (
        <HandleDelete
        userEmail={userData.email}
        portfolioId={selectedPortfolio}
        portfolioName= {selectedPortfolioName}
        onDelete={handleDeleteSave}
        onCancel={handleDeleteCancel}
        />
      )}
      </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default UserDashboard;


