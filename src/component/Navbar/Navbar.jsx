/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState,useContext } from "react";
import { FaBell } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
//import useWebSocket from 'react-use-websocket';
import { toast } from "react-toastify";
import { getIndex } from "../../apis/api.js";
import logo from "../images/logo.png";
import { useWebSocket } from "../websocket/websocket.jsx";
import "./navbarO.css";
import sound from "./noti.mp3";
import secureLocalStorage from "react-secure-storage";
import { GlobalContext } from "../../globalcontext.js";

const Navbar = () => {

  const { lastMessage, profileNotification } = useWebSocket(); // catch the data from websocket

  const { isSocketConnected } = useContext(GlobalContext);

  const [index, setIndex] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const notificationSound = useRef(new Audio(sound));
  const user = JSON.parse(secureLocalStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const notificationDropdownRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const getPicture = () => {
    if (user && user.name) {
      const fullName = user.name.split(" ");
      return {
        firstName: fullName[0],
        profilePicture: user.dpImage || null,
      };
    }
    return {
      firstName: "",
      profilePicture: null,
    };
  };

  const getindex = async () => {
    try {
      const res = await getIndex();

      const indexData = res.data;

      if (
        indexData &&
        indexData.data.close &&
        indexData.data.percentageChange
      ) {
        const percentageChangeString = indexData.data.change.toString();
        const isNegative = percentageChangeString.charAt(0) === "-";
        const arrow = isNegative ? "↓" : "↑";
        const color = isNegative ? "red" : "green";

        const indexedValue = (
          <span style={{ color: color, fontSize: "0.7em" }}>
            {arrow} {indexData.data.close} ({indexData.data.change})
          </span>
        );
        localStorage.setItem("index", JSON.stringify(indexData));
        setIndex(indexedValue);
      } else {
        toast.error("Index Error");
      }
    } catch (error) {
      console.error("Error fetching index:", error);
    }
  };

  //notification sound
  const handleDocumentClick = () => {
    if (
      notificationSound.current &&
      notificationSound.current.paused &&
      notifications.length > 0
    ) {
      notificationSound.current.play();
    }
  };

  //request permission for notification
  const requestNotificationPermission = async () => {
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("10Paisa", {
          body: "Thanks for enabling notifications!",
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Function to clear notifications
  const handleClearNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    localStorage.removeItem("notifications");
    localStorage.setItem("notificationCount", "0");
  };

  //

  useEffect(() => {
    getindex();
    //for persistant notification count
    const storedCount =
      parseInt(localStorage.getItem("notificationCount")) || 0;
    setNotificationCount(storedCount);
    //
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNotifications]);

  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications((prevNotifications) => [
      ...storedNotifications,
      ...prevNotifications,
    ]);
  }, []);

  useEffect(() => {
    if (lastMessage) {
      //update notification list from local storage
      const storedNotifications =
        JSON.parse(localStorage.getItem("notifications")) || [];
      setNotifications(storedNotifications);

      //const newNotification = JSON.parse(lastMessage);

      // only store 50 items //test code //
      storedNotifications.unshift(lastMessage);
      const trimmedNotifications = storedNotifications.slice(0, 20);

      setNotifications(trimmedNotifications);

      //setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      setNotificationCount((prevCount) => prevCount + 1);

      // Save notifications to local storage
      localStorage.setItem(
        "notifications",
        JSON.stringify([lastMessage, ...notifications])
      );

      //update notification count from local storage
      const storedCount =
        parseInt(localStorage.getItem("notificationCount")) || 0;
      const newCount = storedCount + 1;
      localStorage.setItem("notificationCount", newCount.toString());

      //browser permission for new notification.
      if (Notification.permission === "granted") {
        new Notification(lastMessage.title, {
          body: lastMessage.description,
        });
      } else {
        requestNotificationPermission();
      }
    }
  }, [lastMessage]);

  const notificationItems = notifications.map((notification, index) => (
    <div
      key={index}
      onClick={() => {
        window.open(notification.url, "_blank");
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
        <p>
          {notification.description && notification.description.length > 50
            ? `${notification.description.slice(0, 60)}...`
            : notification.description}
        </p>
      </div>
    </div>
  ));

  const { firstName, profilePicture } = getPicture();

  const handleRegisterClick = () => {
    navigate("/login", { state: { showRegister: true } });
  };

  const handleWelcomeDropdownClick = () => {
    setShowNotifications(false);
  };

  const handleNotificationIconClick = (event) => {
    event.stopPropagation();
    setShowNotifications(!showNotifications);

    // setNotificationCount(0);
    // localStorage.setItem('notificationCount', '0');
  };

  const handleIndexClick = (e) => {
    e.preventDefault();
    if (index) {
      navigate("/chart");
    }
  };

  const isLoginPage = location.pathname === "/login";
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand text fw-bold" to="/" exact="true">
            <img
              src={logo}
              alt="Logo"
              className="me-2"
              style={{ width: "30px", height: "30px" }}
            />
            10Paisa🚀{" "}
            {index && (
              <span className="index" onClick={handleIndexClick}>
                {index}
              </span>
            )}
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
                <NavLink className="nav-link" to="/" exact="true">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/news" exact="true">
                  News
                </NavLink>
              </li>
              {user && (
                <li
                  className="nav-item dropdown"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
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

                  <div
                    className={`dropdown-menu ${showDropdown ? "show" : ""}`}
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/myprofile">
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/watchlist">
                        Watchlist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/stocks">
                        Trending
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/commodities">
                        Stocks
                      </NavLink>
                    </li>
                  </div>
                </li>
              )}

              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/dashboard"}>
                    Portfolio
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/worldmarket">
                  Market
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nrbdata">
                  Banking Data
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/feathures">
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">
                  About Us
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {user ? (
                <>
                  {/* Notification Icon */}
                  <div style={{ position: "relative" }}>
                    <FaBell
                      id="notificationIcon"
                      style={{
                        marginRight: "5px",
                        marginBottom: "2px",
                        marginTop: "10px",
                        fontSize: "23px",
                        color: "#616060",
                        cursor: "pointer",
                      }}
                      onClick={handleNotificationIconClick}
                    />
                    {/** Notification Count */}
                    {notificationCount > 0 && (
                      <div className="notification-count">
                        {notificationCount}
                      </div>
                    )}
                    {/** end of notification count */}
                    {/* Notification Dropdown */}
                    {showNotifications && (
                      <div
                        ref={notificationDropdownRef}
                        className="notification-dropdown"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "300px",
                          maxHeight: "400px",
                          overflowY: "auto",
                          background: "#fff",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          borderRadius: "4px",
                          padding: "8px",
                          zIndex: "1000",
                        }}
                      >
                        {/** Clear Notifications */}
                        <div
                          className="dropdown-header"
                          style={{
                            position: "sticky",
                            top: "0",
                            zIndex: "100",
                          }}
                        >
                          {notifications.length > 0 && (
                            <span
                              className="clear-icon"
                              onClick={handleClearNotifications}
                              role="button"
                              tabIndex={0}
                              style={{
                                cursor: "pointer",
                                fontSize: "14px",
                                marginLeft: "230px",
                              }}
                              title="Clear notifications"
                            >
                              ❌
                            </span>
                          )}

                          {!isSocketConnected && (
                            <span
                              style={{
                                color: "orange",
                                marginLeft: "0px",
                                fontSize: "14px",
                                whiteSpace: "nowrap",
                              }}
                              title="Socket error"
                            >
                              ❗
                            </span>
                          )}
                        </div>

                        {/** end of clear notifications */}
                        {notifications.length === 0 ? (
                          <div className="no-notifications">
                            No notifications 🎉
                          </div>
                        ) : (
                          <div className="notification-list">
                            {" "}
                            {notificationItems.slice(0, 20)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`nav-item dropdown ${
                      showDropdown ? "show" : ""
                    }`}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      className="btn dropdown-toggle btn btn-outline-grey"
                      type="button"
                      data-bs-toggle="dropdown"
                      id="profileDropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ border: "none" }}
                      onClick={handleWelcomeDropdownClick}
                    >
                      {profilePicture && (
                        <img
                          src={profilePicture}
                          alt={`${firstName}'s Profile`}
                          className="me-2 rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                      Welcome, {firstName}
                    </button>

                    <ul className="dropdown-menu">
                      {user.isAdmin && (
                        <>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/admin/dashboard"
                            >
                              Admin Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/admin/userlogs"
                            >
                              User Logs
                            </NavLink>
                          </li>
                        </>
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
              ) : (
                !isLoginPage && (
                  <>
                    <NavLink
                      className="btn btn-outline-primary me-2"
                      to={"/login"}
                    >
                      Login
                    </NavLink>
                    <button
                      className="btn btn-outline-success"
                      onClick={handleRegisterClick}
                    >
                      Register
                    </button>
                  </>
                )
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
