import React, { useEffect, useRef, useState } from 'react';
import { FaCubes, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { createWatchlist,deleteWatchlist, getWatchlist, renameWatchlist } from '../../apis/api.js';
import HandleCreate from './handlecreate.jsx';
import HandleRename from './handlerename.jsx';
import HandleDelete from './handledelete.jsx';

import './user.css';

const UserWatchlists = () => {
  const [userWatchlists, setUserWatchlists] = useState([]);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);
  const wrapperRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);

        if (storedUserData) {
          const watchlists = await getWatchlist(storedUserData.email);

          if (watchlists.status === 200 && watchlists.data.success) {
            console.log('Watchlists:', watchlists.data.data);
            setUserWatchlists(watchlists.data.data);
          } else {
            toast.error('Error fetching watchlists');
            console.error(watchlists.data.message);
          }
        } else {
          console.error('User data not found in local storage');
        }
      } catch (error) {
        console.error('Error fetching watchlists:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchWatchlists();
  }, []);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   const handleMenuToggle = (e) => {
//     e.preventDefault();
//     setIsMenuOpen(!isMenuOpen);
//   };


    const handleMenuToggle = () => {
        setShowCreateDialog(true);
    };

  const handleMenuOptionClick = (action) => {
    console.log('Selected option:', action);
    setShowOptions(false);
  };

  const handleRenameClick = (watchlistId) => {
    setSelectedWatchlist(watchlistId);
    setShowRenameDialog(true);
  };

  const handleDeleteClick = (watchlistId) => {
    setSelectedWatchlist(watchlistId);
    setShowDeleteDialog(true);
    };

    const handleDeleteSave = async (event, email, watchlistId) => {
        event.preventDefault();
        console.log("email and watchlistId", email, watchlistId)
        try {
            const res = await deleteWatchlist(email, watchlistId);
            const { success, message } = res.data;

            if (success) {
                toast.success(message);
                setUserWatchlists((prevWatchlists) => {
                const updatedWatchlists = prevWatchlists.filter((watchlist) => watchlist._id !== watchlistId);

                return updatedWatchlists;
                });
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

  const handleRenameSave = async (event, email, watchlistId, newName) => {
    event.preventDefault();

    try {
    const res = await renameWatchlist(email,watchlistId,newName );
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
            : 'An error occurred.';
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
                : 'An error occurred.';
            toast.error(errorMessage);
          }
    setShowCreateDialog(false);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  };

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
        <p>{userData.email}</p>
        <p>{userData.phone}</p>
        <p>Balance: Rs {userData.userAmount}</p>
      </div>
      <div className="user-info-cards">
          <InfoCard icon={<FaCubes />} value={totalwatchlist} label="Total Watchlist" />
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
                      onClick={() => handleRenameClick(watchlistItem._id)}
                    >
                      Rename Watchlist
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleRenameClick(watchlistItem._id)}
                    >
                      Add Stock
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleMenuOptionClick(watchlistItem._id, 'RemoveStock')}
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
                  <li>
                  </li>
                </ul>
              </div>


              </div>

              {watchlistItem.stocks && watchlistItem.stocks.length > 0 ? (
                <div className="stocks">
                  <h3>Stocks</h3>
                  {watchlistItem.stocks.map((stockSymbol) => (
                    <div key={stockSymbol} className="stock">
                      <p>Symbol: {stockSymbol}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No stocks available for this watchlist.</p>
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
    newName={userWatchlists.find(w => w._id === selectedWatchlist)?.name || ''}
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
        portfolioName={userWatchlists.find(w => w._id === selectedWatchlist)?.name || ''}
        onDelete={handleDeleteSave}
        onCancel={handleDeleteCancel}
        />
      )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default UserWatchlists;
