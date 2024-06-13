import React, { useEffect, useState } from "react";
import {
  FaCubes,
  FaDollarSign,
  FaMoneyBill,
  FaMoneyCheck,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addStockToPortfolio,
  createPortfolio,
  deletePortfolio,
  getAllAssets,
  getCommo,
  getMetals,
  getPortfolio,
  removeStockFromPortfolio,
  renamePortfolio,
} from "../../apis/api.js";
import secureLocalStorage from "react-secure-storage";
import NoImage from "../wishlist/a.png";
import HandleAddStock from "./handleaddstock";
import HandleCreate from "./handlecreate";
import HandleDelete from "./handledelete";
import HandleRemoveStock from "./handledeletestock";
import HandleRename from "./handlerename";

import "./user.css";

const UserDashboard = () => {
  const [userPort, setUserPort] = useState([]);
  const [userData, setUserData] = useState(null);
  const [portfolioStockCounts, setPortfolioStockCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddStockDialog, setshowAddStockDialog] = useState(false);
  const [showRemoveStockDialog, setRemoveStockDialog] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedPortfolioName, setSelectedPortfolioName] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  const fetchData = async () => {
    try {
      const assetResponse = await getAllAssets();
      if (
        assetResponse.status === 200 &&
        Array.isArray(assetResponse.data.data.stockDataWithoutName)
      ) {
        const jsonDecode = JSON.stringify(assetResponse.data.data.stockDataWithoutName);
        localStorage.setItem("Assets", jsonDecode);
      } else {
        toast.error("Error fetching assets");
        console.error("Error fetching assets:", assetResponse.error);
      }

      const metalsResponse = await getMetals();
      if (
        metalsResponse.status === 200 &&
        Array.isArray(metalsResponse.data.metalData)
      ) {
        const jsonDecode = JSON.stringify(metalsResponse.data.metalData);
        localStorage.setItem("Metals", jsonDecode);
      } else {
        toast.error("Error fetching metals");
        console.error("Error fetching metals:", metalsResponse.error);
      }

      const commodityResponse = await getCommo();
      if (
        commodityResponse.status === 200 &&
        Array.isArray(commodityResponse.data.data)
      ) {
        const jsonDecode = JSON.stringify(commodityResponse.data.data);
        localStorage.setItem("Commodities", jsonDecode);
      } else {
        toast.error("Error fetching commodities");
        console.error("Error fetching commodities:", commodityResponse.error);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const storedUserData = JSON.parse(secureLocalStorage.getItem("user"));

      setUserData(storedUserData);

      if (storedUserData) {
        const port = await getPortfolio();

        if (port.status === 200) {
          const stockCounts = {};
          port.data.data.portfolio.forEach((portfolio) => {
            stockCounts[portfolio._id] = portfolio.stocks
              ? portfolio.stocks.length
              : 0;
          });

          setPortfolioStockCounts(stockCounts);

          const jsonDecode = JSON.stringify(port.data.data.portfolio);
          localStorage.setItem("Portfolio", jsonDecode);

          setUserPort(port.data.data);
        } else {
          console.error("Error fetching portfolio");
        }
      } else {
        console.error("User data not found in local storage");
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleMenuToggle = () => {
    setShowCreateDialog(true);
  };

  const handleRenameClick = (portfolioId, portfolioName) => {
    setSelectedPortfolio(portfolioId);
    setSelectedPortfolioName(portfolioName);
    setShowRenameDialog(true);
  };

  const handleDeleteClick = (portfolioId, portfolioName) => {
    setSelectedPortfolio(portfolioId);
    setSelectedPortfolioName(portfolioName);
    setShowDeleteDialog(true);
  };

  const handleAddStockClick = (portfolioId, portfolioName) => {
    setSelectedPortfolio(portfolioId);
    setSelectedPortfolioName(portfolioName);
    setshowAddStockDialog(true);
  };

  const handleRemoveStockClick = (portfolioId, portfolioName, stocks) => {
    setSelectedPortfolio(portfolioId);
    setSelectedPortfolioName(portfolioName);
    const stockSymbols = stocks.map((stock) => stock.symbol);
    setSelectedStock(stockSymbols);
    setRemoveStockDialog(true);

    console.log("Selected stock:", stocks);
    console.log(selectedStock);
  };

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
          : "An error occurred.";
      toast.error(errorMessage);
    }

    setShowCreateDialog(false);
  };

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
          : "An error occurred.";
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
          : "An error occurred.";
      toast.error(errorMessage);
    }

    setShowRenameDialog(false);
  };

  const handleAddStockSave = async (
    event,
    email,
    id,
    symboll,
    quantityy,
    price
  ) => {
    event.preventDefault();

    try {
      const res = await addStockToPortfolio({
        email,
        id,
        symboll,
        quantityy,
        price,
      });
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
          : "An error occurred.";
      toast.error(errorMessage);
    }

    setshowAddStockDialog(false);
  };

  const handleRemoveStockSave = async (event, email, id, symbol, quantity) => {
    event.preventDefault();

    try {
      const res = await removeStockFromPortfolio({
        email,
        id,
        symbol,
        quantity,
      });
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
          : "An error occurred.";
      toast.error(errorMessage);
    }

    setRemoveStockDialog(false);
  };

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
    <div className="user-dashboardxx">
      <div className="user-info">
        <img src={userData.dpImage} alt="User DP" />
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Balance: Rs {userData.userAmount}</p>
      </div>
      <h4>Your Portfolios: </h4>

      <div className="user-info-cards">
        <InfoCard
          icon={<FaMoneyCheck />}
          value={` ${userPort.portfolioData.portfolioCount}`}
          label="Total Portfolios"
        />
        <InfoCard
          icon={<FaCubes />}
          value={userPort.portfolioData.totalStocks}
          label="Total Stocks"
        />
        <InfoCard
          icon={<FaCubes />}
          value={userPort.portfolioData.totalUnits}
          label="Total Units"
        />
        <InfoCard
          icon={<FaMoneyCheck />}
          value={` ${userPort.portfolioData.profitablePortfolios}`}
          label="Profitable Portfolios"
        />
        <InfoCard
          icon={<FaMoneyCheck />}
          value={` ${userPort.portfolioData.unprofitablePortfolios}`}
          label="Unprofitable Portfolios"
        />
        <InfoCard
          icon={<FaDollarSign />}
          value={`Rs ${userPort.portfolioData.totalPortfolioValue}`}
          label="Portfolio Value"
        />
        <InfoCard
          icon={<FaDollarSign />}
          value={`Rs ${userPort.portfolioData.totalPortfolioCost}`}
          label="Portfolio Cost"
        />

        <InfoCard
          icon={<FaMoneyBill />}
          value={
            <span
              style={{
                color:
                  userPort.portfolioData.totalPortfolioReturns >= 0
                    ? "green"
                    : "red",
              }}
            >
              Rs {userPort.portfolioData.totalPortfolioReturns}
            </span>
          }
          label="Total Net Gain/Loss"
        />

        <InfoCard
          icon={<FaMoneyBill />}
          value={
            <span
              style={{
                color:
                  userPort.portfolioData.totalPortfolioReturnsPercentage >= 0
                    ? "green"
                    : "red",
              }}
            >
              {userPort.portfolioData.totalPortfolioReturnsPercentage} %
            </span>
          }
          label="Percentage P/L"
        />
      </div>

      <div className="portfolio">
        {userPort.portfolio &&
          userPort.portfolio.map((portfolioItem) => (
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
                        onClick={() =>
                          handleRenameClick(
                            portfolioItem._id,
                            portfolioItem.name
                          )
                        }
                      >
                        Rename Portfolio
                      </button>
                    </li>
                    <li key={portfolioItem._id}>
                      <Link
                        to={`/portfolio/${portfolioItem._id}`}
                        className="dropdown-link"
                      >
                        <button className="dropdown-item">
                          View Portfolio
                        </button>
                      </Link>
                    </li>
                    <li key={portfolioItem._id}>
                      <Link
                        to={`/portfoliocompare/${portfolioItem._id}`}
                        className="dropdown-link"
                      >
                        <button className="dropdown-item">
                          Compare Portfolio
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleAddStockClick(
                            portfolioItem._id,
                            portfolioItem.name
                          )
                        }
                      >
                        Add Stock
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleRemoveStockClick(
                            portfolioItem._id,
                            portfolioItem.name,
                            portfolioItem.stocks
                          )
                        }
                      >
                        Remove Stock
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleDeleteClick(
                            portfolioItem._id,
                            portfolioItem.name
                          )
                        }
                      >
                        Delete Portfolio
                      </button>
                    </li>
                    <li></li>
                  </ul>
                </div>
              </div>

              {portfolioItem.totalunits !== undefined &&
                portfolioItem.stocks &&
                portfolioItem.stocks.length > 0 && (
                  <p>Total Units: {portfolioItem.totalunits}</p>
                )}
              {portfolioItem.portfoliocost !== undefined &&
                portfolioItem.stocks &&
                portfolioItem.stocks.length > 0 && (
                  <p>Portfolio Cost: Rs {portfolioItem.portfoliocost}</p>
                )}

              {portfolioItem.portfoliovalue !== undefined &&
                portfolioItem.stocks &&
                portfolioItem.stocks.length > 0 && (
                  <p>Portfolio Value: Rs {portfolioItem.portfoliovalue}</p>
                )}
              {portfolioItem.portfoliovalue !== undefined &&
                portfolioItem.stocks &&
                portfolioItem.stocks.length > 0 && (
                  <p>
                    Percentage:{" "}
                    <span
                      className={
                        portfolioItem.portfoliovalue -
                          portfolioItem.portfoliocost >=
                        0
                          ? "profit"
                          : "loss"
                      }
                    >
                      {portfolioItem.portfolioPercentage}%
                    </span>
                  </p>
                )}

              {portfolioItem.portfoliovalue !== undefined &&
                portfolioItem.stocks &&
                portfolioItem.stocks.length > 0 && (
                  <p>
                    Profit / Loss:{" "}
                    <span
                      className={
                        portfolioItem.portfoliovalue -
                          portfolioItem.portfoliocost >=
                        0
                          ? "profit"
                          : "loss"
                      }
                    >
                      Rs{" "}
                      {portfolioItem.portfoliovalue -
                        portfolioItem.portfoliocost}
                    </span>
                  </p>
                )}
              {portfolioItem.portfoliocost !== undefined &&
                portfolioItem.stocks &&
                portfolioItem.stocks.length > 0 && (
                  <p>Recommendation: {portfolioItem.recommendation}</p>
                )}
              {portfolioItem.stocks && portfolioItem.stocks.length > 0 ? (
                <div className="stocks">
                  <h4>
                    Assets: {portfolioStockCounts[portfolioItem._id] || 0}{" "}
                    Companies
                  </h4>
                  {portfolioItem.stocks.map((stock) => (
                    <div key={stock._id} className="stock">
                      <p>Symbol: {stock.symbol}</p>
                      <p>Quantity: {stock.quantity}</p>
                      <p>Wacc: {stock.wacc}</p>
                      <p>Last Price: Rs {stock.ltp}</p>
                      <p>Costprice: Rs {stock.costprice}</p>
                      <p>Current Price: Rs {stock.currentprice}</p>
                      <p>
                        Net Gain/Loss:{" "}
                        <span
                          className={stock.netgainloss >= 0 ? "profit" : "loss"}
                        >
                          Rs {stock.netgainloss}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={NoImage}
                    alt="No stocks available"
                    height={100}
                    width={100}
                    style={{ display: "block", margin: "auto" }}
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
              portfolioName={selectedPortfolioName}
              onAdd={handleAddStockSave}
              onCancel={handleAddStockCancel}
            />
          )}

          {showRenameDialog && (
            <HandleRename
              userEmail={userData.email}
              portfolioId={selectedPortfolio}
              portfolioName={selectedPortfolioName}
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
              portfolioName={selectedPortfolioName}
              stocks={selectedStock}
              onSave={handleRemoveStockSave}
              onCancel={handleRemoveStockCancel}
            />
          )}
          {showDeleteDialog && (
            <HandleDelete
              userEmail={userData.email}
              portfolioId={selectedPortfolio}
              portfolioName={selectedPortfolioName}
              onDelete={handleDeleteSave}
              onCancel={handleDeleteCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
