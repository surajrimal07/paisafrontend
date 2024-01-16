import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();

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

  const { firstName, profilePicture } = getPicture();

  const handleRegisterClick = () => {
    navigate('/login', { state: { showRegister: true } });
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand text fw-bold" to="/" activeClassName="active" exact>
            <img src={logo} alt="Logo" className="me-2" style={{ width: '30px', height: '30px' }} />
            10Paisa
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

              {user && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/myprofile"
                    activeClassName="active"
                  >
                    Profile
                  </NavLink>
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
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-dark dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ border: 'none' }}
                    >
                      {profilePicture && (
          <img
            src={profilePicture}
            alt={`${firstName}'s Profile`}
            className="me-2 rounded-circle"
            style={{ width: '30px', height: '30px' }}
          />
        )}
                      Welcome, {firstName}!
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to="/myprofile" activeClassName="active">
                          Profile
                        </NavLink>
                      </li>
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
                        <NavLink className="dropdown-item" to="/changepp" activeClassName="active">
                          Change password
                        </NavLink>
                      </li>
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
      </nav>
    </>
  );
};

export default Navbar;
