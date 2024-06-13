import React, { useEffect, useRef, useState } from "react";
import { FaCubes, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addStockToWatchlist,
  createWatchlist,
  deleteWatchlist,
  getWatchlist,
  removeStockFromWatchlist,
  renameWatchlist,
} from "../../apis/api.js";
import NoImage from "./a.png";
import HandleAddStock from "./handleaddstock.jsx";
import HandleCreate from "./handlecreate.jsx";
import HandleDelete from "./handledelete.jsx";
import HandleRemoveStock from "./handledeletestock.jsx";
import HandleRename from "./handlerename.jsx";
import secureLocalStorage from "react-secure-storage";


import "./user.css";

const UserWatchlists = () => {
  const [userWatchlists, setUserWatchlists] = useState([]);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddStockDialog, setshowAddStockDialog] = useState(false);
  const [showRemoveStockDialog, setRemoveStockDialog] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [totalStocksCount, setTotalStocksCount] = useState(0);
  const [portfolioStockCounts, setPortfolioStockCounts] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const storedUserData = JSON.parse(secureLocalStorage.getItem("user"));
        setUserData(storedUserData);

        if (storedUserData) {
          const watchlists = await getWatchlist(storedUserData.email);

          if (watchlists.status === 200 && watchlists.data.success) {
            const allStocks = watchlists.data.data.reduce(
              (acc, watchlist) => acc.concat(watchlist.stocks || []),
              []
            );
            const stockCounts = {};
            watchlists.data.data.forEach((watchlist) => {
              stockCounts[watchlist._id] = watchlist.stocks
                ? watchlist.stocks.length
                : 0;
            });
            setPortfolioStockCounts(stockCounts);
            setUserWatchlists(watchlists.data.data);
            setTotalStocksCount(allStocks.length);
          } else {
            toast.error("Error fetching watchlists");
          }
        } else {
          console.error("User data not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching watchlists:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchWatchlists();
  }, []);

  const handleMenuToggle = () => {
    setShowCreateDialog(true);
  };

  const handleRenameClick = (watchlistId) => {
    setSelectedWatchlist(watchlistId);
    setShowRenameDialog(true);
  };

  const handleDeleteClick = (watchlistId) => {
    setSelectedWatchlist(watchlistId);
    setShowDeleteDialog(true);
  };

  const handleAddStockClick = (watchlistId) => {
    setSelectedWatchlist(watchlistId);
    setshowAddStockDialog(true);
  };

  const handleRemoveStockClick = (watchlistId) => {
    setSelectedWatchlist(watchlistId);
    setRemoveStockDialog(true);
  };

  const getStockLTP = (stockSymbol) => {
    const assets = JSON.parse(localStorage.getItem("Assets"));

    if (assets) {
      const stockData = assets.find((stock) => stock.symbol === stockSymbol);

      if (stockData && stockData.ltp !== undefined) {
        return ` Rs ${stockData.ltp}`;
      }
    }

    return "";
  };

  const handleDeleteSave = async (event, email, watchlistId) => {
    event.preventDefault();
    try {
      const res = await deleteWatchlist(email, watchlistId);
      const { success, message } = res.data;

      if (success) {
        toast.success(message);
        setUserWatchlists((prevWatchlists) => {
          const updatedWatchlists = prevWatchlists.filter(
            (watchlist) => watchlist._id !== watchlistId
          );

          return updatedWatchlists;
        });
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

  const handleRemoveStockSave = async (
    event,
    email,
    watchlistId,
    stockSymbol
  ) => {
    event.preventDefault();
    try {
      const res = await removeStockFromWatchlist(
        email,
        watchlistId,
        stockSymbol
      );
      const { success, message } = res.data;

      if (success) {
        toast.success(message);
        setUserWatchlists((prevWatchlists) => {
          const updatedWatchlists = prevWatchlists.map((watchlist) => {
            if (watchlist._id === watchlistId) {
              return {
                ...watchlist,
                stocks: watchlist.stocks.filter(
                  (stock) => stock !== stockSymbol
                ),
              };
            }

            return watchlist;
          });

          return updatedWatchlists;
        });
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

  const handleAddStockSave = async (event, email, watchlistId, stockSymbol) => {
    event.preventDefault();

    try {
      const res = await addStockToWatchlist(email, watchlistId, stockSymbol);
      const { success, message } = res.data;

      if (success) {
        toast.success(message);
        setUserWatchlists((prevWatchlists) => {
          const updatedWatchlists = prevWatchlists.map((watchlist) => {
            if (watchlist._id === watchlistId) {
              return {
                ...watchlist,
                stocks: [...watchlist.stocks, stockSymbol],
              };
            }

            return watchlist;
          });

          return updatedWatchlists;
        });
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

  const handleRenameSave = async (event, email, watchlistId, newName) => {
    event.preventDefault();

    try {
      const res = await renameWatchlist(email, watchlistId, newName);
      const { success, message } = res.data;

      if (success) {
        toast.success(message);
        setUserWatchlists((prevWatchlists) => {
          const updatedWatchlists = prevWatchlists.map((watchlist) => {
            if (watchlist._id === watchlistId) {
              return {
                ...watchlist,
                name: newName,
              };
            }

            return watchlist;
          });

          return updatedWatchlists;
        });
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

  const handleCreateSave = async (event, email, watchlistName) => {
    event.preventDefault();

    try {
      const res = await createWatchlist(email, watchlistName);
      const { success, message } = res.data;

      if (success) {
        toast.success(message);
        setUserWatchlists((prevWatchlists) => {
          const updatedWatchlists = [...prevWatchlists, res.data.data];

          return updatedWatchlists;
        });
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

  //cancel functions

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  //add total count in json itself later
  const totalwatchlist = userWatchlists && userWatchlists.length;

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
    <div className="user-watchlists">
      <div className="user-info">
        <img src={userData.dpImage} alt="User DP" />
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Balance: Rs {userData.userAmount}</p>
      </div>
      <h4>Your Watchlists: </h4>
      <div className="user-info-cards">
        <InfoCard
          icon={<FaCubes />}
          value={totalwatchlist}
          label="Total Watchlist"
        />
        <InfoCard
          icon={<FaCubes />}
          value={totalStocksCount}
          label="Total Stocks"
        />
      </div>
      <div className="watchlists">
        <div className="watchlist-container" ref={wrapperRef}>
          {userWatchlists.map((watchlistItem) => (
            <div key={watchlistItem._id} className="watchlist-item">
              <div className="watchlist-header">
                <h4>Name: {watchlistItem.name}</h4>

                <div className="watchlist-menu">
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
                        onClick={() => handleRenameClick(watchlistItem._id)}
                      >
                        Rename Watchlist
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleAddStockClick(watchlistItem._id)}
                      >
                        Add Stock
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleRemoveStockClick(watchlistItem._id)
                        }
                      >
                        Remove Stock
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleDeleteClick(watchlistItem._id)}
                      >
                        Delete Watchlist
                      </button>
                    </li>
                    <li></li>
                  </ul>
                </div>
              </div>

              {watchlistItem.stocks && watchlistItem.stocks.length > 0 ? (
                <div className="stocks">
                  <h3>
                    Stocks: {portfolioStockCounts[watchlistItem._id] || 0}
                  </h3>
                  {watchlistItem.stocks.map((stockSymbol) => (
                    <div key={stockSymbol} className="stock">
                      <p>
                        {" "}
                        <Link
                          to={`/stockdetailview?symbol=${stockSymbol}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {stockSymbol + ":"}
                          {getStockLTP(stockSymbol)}
                        </Link>
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
            {showRenameDialog && (
              <HandleRename
                userEmail={userData.email}
                portfolioId={selectedWatchlist}
                newName={
                  userWatchlists.find((w) => w._id === selectedWatchlist)
                    ?.name || ""
                }
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
            {showDeleteDialog && (
              <HandleDelete
                userEmail={userData.email}
                portfolioId={selectedWatchlist}
                portfolioName={
                  userWatchlists.find((w) => w._id === selectedWatchlist)
                    ?.name || ""
                }
                onDelete={handleDeleteSave}
                onCancel={handleDeleteCancel}
              />
            )}
            {showAddStockDialog && (
              <HandleAddStock
                userEmail={userData.email}
                watchlistId={selectedWatchlist}
                watchlistName={
                  userWatchlists.find((w) => w._id === selectedWatchlist)
                    ?.name || ""
                }
                onAdd={handleAddStockSave}
                onCancel={handleAddStockCancel}
              />
            )}
            {showRemoveStockDialog && (
              <HandleRemoveStock
                userEmail={userData.email}
                watchlistId={selectedWatchlist}
                stocks={
                  userWatchlists.find((w) => w._id === selectedWatchlist)
                    ?.stocks || []
                }
                onSave={handleRemoveStockSave}
                onCancel={handleRemoveStockCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWatchlists;
