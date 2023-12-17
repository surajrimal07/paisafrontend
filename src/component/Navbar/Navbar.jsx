import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <nav className="navbar bg-info navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand text-danger fw-bold" to="/">10Paisa</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About Us</Link>
              </li>

            </ul>
            <form className="d-flex" role="search">
              {
                user ? <>
                  <div class="dropdown">
                    <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Welcome, {user.name}!
                    </button>
                    <ul class="dropdown-menu">
                      <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
                      <li><Link class="dropdown-item" to="/dashboard">Dashboard</Link></li>
                      <li><Link class="dropdown-item" to="/changepp">Change password</Link></li>
                      <li><Link class="dropdown-item" to="/logout">Logout</Link></li>
                    </ul>
                  </div>

                </>
                  : <>
                    <Link className="btn btn-outline-primary me-2" to={'/login'}>Login</Link>
                    <Link className="btn btn-outline-success" to={'/signup'}>Register</Link>
                  </>
              }
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar