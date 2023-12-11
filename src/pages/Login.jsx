import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../apis/api'; // Import the loginUser function
import logo from "../component/images/hilogo.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      toast.error('Invalid email format');
      return;
    }

    try {
      const response = await loginUser(email, password);

      if (response.status === 200) {
        toast.success('Login successful');
        console.log('Login successful');
        console.log(response.data.token)
        localStorage.setItem('token',response.data.token)
        const jsonDecode= JSON.stringify(response.data)
        localStorage.setItem('user',jsonDecode)
        navigate('/dashboard');
      } else if (response.status === 401) {
        toast.error("Invalid email or password. Please check your credentials and try again.");
        console.log('Invalid email or password');
      } else {
        toast.error('An unexpected error occurred');
        console.log('Unexpected error');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-6 bg-primary d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img src={logo} alt="Logo" className="img-fluid" />
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card border-0 shadow-lg bg-light">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">10Paisa Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login to 10Paisa
                  </button>
                </div>
                <div className="text-center">
                  Don't have an account? <Link to="/signup">Signup</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
