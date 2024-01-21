import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWebSocket from 'react-use-websocket';
import { getIndex } from '../../apis/api.js';
import logo from '../images/logo.png';
import './navbarO.css';
import sound from './noti.mp3';

const Navbar = () => {
  const { lastMessage } = useWebSocket('ws://localhost:8081');
  const [index, setIndex] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const notificationSound = useRef(new Audio(sound));
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const notificationDropdownRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  const getPicture = () => {
    if (user && user.name) {
      const fullName = user.name.split(' ');
      return {
        firstName: fullName[0],
        profilePicture: user.dpImage || null,
      };
    }
    return {
      firstName: '',
      profilePicture: null,
    };
  };

  const getindex = async () => {
    try {
      const res = await getIndex();

      const indexData = res.data;

      if (indexData && indexData.index && indexData.percentage) {
        const isNegative = indexData.percentage.charAt(0) === '-';
        const arrow = isNegative ? '↓' : '↑';
        const color = isNegative ? 'red' : 'green';

        const indexedValue = (
          <span style={{ color: color, fontSize: '0.7em'}}>
            {arrow} {indexData.index} ({indexData.percentage})
          </span>
        );


        localStorage.setItem('index', JSON.stringify(indexData));
        setIndex(indexedValue);
      } else {
        //toast.error("Index Error");
      }
    } catch (error) {
      console.error('Error fetching index:', error);
    }
  };

  //notification sound
  const handleDocumentClick = () => {
    if (notificationSound.current && notificationSound.current.paused && notifications.length > 0) {
      notificationSound.current.play();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [])

    // Function to clear notifications
    const handleClearNotifications = () => {
      setNotifications([]);
      setNotificationCount(0);
      localStorage.removeItem('notifications');
    };

  //

  useEffect(() => {
    getindex();
    //for persistant notification count
    const storedCount = parseInt(localStorage.getItem('notificationCount')) || 0;
    setNotificationCount(storedCount);
    //
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNotifications]);


  useEffect(() => {
    if (lastMessage) {
      const newNotification = JSON.parse(lastMessage.data);
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      setNotificationCount((prevCount) => prevCount + 1);

      const storedCount = parseInt(localStorage.getItem('notificationCount')) || 0;
      const newCount = storedCount + 1;
      localStorage.setItem('notificationCount', newCount.toString());

      // Save notifications to local storage
      localStorage.setItem('notifications', JSON.stringify([newNotification, ...notifications]));
    }
  }, [lastMessage]);


  const notificationItems = notifications.map((notification, index) => (
    <div
      key={index}

      onClick={() => {
        window.open(notification.url, '_blank');
        setShowNotifications(false);
      }}
      className="notification-item"
    >
      {/* {notification.image && (
        <img
          src={notification.image}
          alt="Notification"
          className="notification-image"
          style={{ maxWidth: '0px', maxHeight: '50px', marginRight: '10px' }}
        />
      )} */}
      <div className="notification-content">
        <strong>{notification.title}</strong>
        <p>{notification.description.slice(0, 50)}...</p>
      </div>
    </div>
  ));

  const { firstName, profilePicture } = getPicture();

  const handleRegisterClick = () => {
    navigate('/login', { state: { showRegister: true } });
  };

  const handleWelcomeDropdownClick = () => {
    setShowNotifications(false);
  };

  const handleNotificationIconClick = (event) => {
    event.stopPropagation();
    setShowNotifications(!showNotifications);
    setNotificationCount(0);
    localStorage.setItem('notificationCount', '0');
  };

  const isLoginPage = location.pathname === '/login';
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand text fw-bold" to="/" activeClassName="active" exact>
            <img src={logo} alt="Logo" className="me-2" style={{ width: '30px', height: '30px' }} />
            10Paisa🚀 {index && <span className="index">{index}</span>}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" activeClassName="active" exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/news" activeClassName="active" exact>
                  News
                </NavLink>
              </li>


              {user && (
  <li className="nav-item dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
    <button
      className="nav-link dropdown-toggle"
      type="button"
      id="profileDropdown"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Profile
    </button>

    <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="profileDropdown">
      <li>
        <NavLink className="dropdown-item" to="/myprofile" activeClassName="active">
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink className="dropdown-item" to="/portfolio" activeClassName="active">
          Portfolio
        </NavLink>
      </li>
      <li>
        <NavLink className="dropdown-item" to="/wishlist" activeClassName="active">
          Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink className="dropdown-item" to="/userdashboard" activeClassName="active">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink className="dropdown-item" to="/stocks" activeClassName="active">
          Trending
        </NavLink>
      </li>
      <li>
        <NavLink className="dropdown-item" to="/commodities" activeClassName="active">
          Commodities
        </NavLink>
      </li>
    </div>
  </li>
)}

              <li className="nav-item">
                <NavLink className="nav-link" to="/feathures" activeClassName="active">
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus" activeClassName="active">
                  About Us
                </NavLink>
              </li>

              {user && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={user.isAdmin ? '/admin/dashboard' : '/dashboard'}
                    activeClassName="active"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              {user ? (
                <>
                {/* Notification Icon */}
                <div style={{ position: 'relative' }}>
                <FaBell
                id="notificationIcon"
                  style={{
                    marginRight: '5px',
                    marginBottom: '2px',
                    marginTop: '10px',
                    fontSize: '23px',
                    color: '#616060',
                    cursor: 'pointer',
                  }}
                  onClick={handleNotificationIconClick}
                />
                {/** Notification Count */}
                {notificationCount > 0 && (
          <div className="notification-count">{notificationCount}</div>
        )}
        {/** end of notification count */}
                                  {/* Notification Dropdown */}
                                  {showNotifications && (
                    <div
                    ref={notificationDropdownRef}
                    className="notification-dropdown"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '300px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        background: '#fff',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px',
                        padding: '8px',
                        zIndex: '1000',
                      }}
                    >
                     {/** Clear Notifications */}
                     <div className="dropdown-header">
            <span className="clear-icon" onClick={handleClearNotifications} role="button" tabIndex={0}>
              <i className="fas fa-trash-alt"></i>
            </span>
          </div>
          {/** end of clear notifications */}
                       {notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            <div className="notification-list">{notificationItems}</div>
          )}
                    </div>

                  )}
                   </div>


                   <div className={`nav-item dropdown ${showDropdown ? 'show' : ''}`} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
  <button
    className="btn dropdown-toggle btn btn-outline-grey"
    type="button"
    data-bs-toggle="dropdown"
    id="profileDropdown"
    aria-haspopup="true"
    aria-expanded="false"
    style={{ border: 'none' }}
    onClick={handleWelcomeDropdownClick}
  >
    {profilePicture && (
      <img
        src={profilePicture}
        alt={`${firstName}'s Profile`}
        className="me-2 rounded-circle"
        style={{ width: '30px', height: '30px' }}
      />
    )}
    Welcome, {firstName}
  </button>
  <ul className="dropdown-menu">
    {user.isAdmin ? (
      <li>
        <NavLink className="dropdown-item" to="/admin/dashboard" activeClassName="active">
          Admin Dashboard
        </NavLink>
      </li>
    ) : (
      <li>
        <NavLink className="dropdown-item" to="/dashboard" activeClassName="active">
          User Dashboard
        </NavLink>
      </li>
    )}

    <li>
      <button
        onClick={handleLogout}
        className="dropdown-item"
        to="/logout"
      >
        Logout
      </button>
    </li>
  </ul>
</div>



                </>



              ) : !isLoginPage && (
                <>
                  <NavLink className="btn btn-outline-primary me-2" to={'/login'} activeClassName="active">
                    Login
                  </NavLink>
                  <button
              className="btn btn-outline-success"
              onClick={handleRegisterClick}
            >
              Register
            </button>
                </>
              )}
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" />
      </nav>
    </>
  );
};

export default Navbar;
