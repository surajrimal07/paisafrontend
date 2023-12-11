import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterUser from '../apis/api.js';
import logo from "../component/images/hilogo.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isNaN(phone) || phone.length !== 10) {
      console.error('Invalid phone number. Please enter a 10-digit numeric phone number.');
      return;
    }


    try {
      const response = await RegisterUser(name, phone, email, password);

      console.log(response);

      if (response === 200) {
        toast.success('Registration successful');
        console.log('Registration successful');
        localStorage.setItem('token',response.data.token)
        const jsonDecode= JSON.stringify(response.data.userData)
        localStorage.setItem('user',jsonDecode)
        navigate('/dashboard');
      } else if (response === 400) {
        toast.error('Email already exists');
        console.log('Registration failed - Email already exists');
      } else {
        toast.error('Server Error');
        console.log('Registration failed - Server Error:', response);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      toast.error('An error occurred during registration');
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
              <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Register to 10Paisa</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
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
                    Register to 10Paisa
                  </button>
                </div>
                <div className="text-center">
                  Already have an account? <Link to="/login">Login</Link>
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

export default Register;
