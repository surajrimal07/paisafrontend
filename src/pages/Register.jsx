import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUser } from '../apis/api.js';
import logo from "../component/images/hilogo.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //for error message
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  //for validation
  const validate = () => {
    let isValid = true;

    //reset error message
    setNameError('')
    setPhoneError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    if(name.trim() === '') {
      setNameError("Please enter your name");
      isValid = false;
    }
    if(phone.trim() === ''|| phone.length !== 10) {
      setPhoneError("Please enter your phone");
      isValid = false;
    }
    if(email.trim() === '') {
      setEmailError("Please enter your email");
      isValid = false;
    }
    if(password.trim() === '') {
      setPasswordError("Please enter your password");
      isValid = false;
    }
    if(confirmPassword.trim() === '') {
      setConfirmPasswordError("Please enter your confirm password");
      isValid = false;
    }

    if(password.trim() !== confirmPassword.trim() ){
      setConfirmPasswordError("Password do not match");
      isValid = false;
    }
    return isValid;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError('')
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneError('')
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('')
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('')
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError('')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validate()
    if (!isValid) {
      return
    }
    // if (isNaN(phone) || phone.length !== 10) {
    //   console.error('Invalid phone number. Please enter a 10-digit numeric phone number.');
    //   return;
    // }

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
          <img src={logo} alt="Logo" className="img-fluid custom-logo" />
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
                  {
                    nameError &&  <p className='text-danger'>{nameError}</p>
                  }
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
                {
                    phoneError &&  <p className='text-danger'>{phoneError}</p>
                  }
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
                  {
                    emailError &&  <p className='text-danger'>{emailError}</p>
                  }
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
                  {
                    passwordError &&  <p className='text-danger'>{passwordError}</p>
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                  </label>
                  <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {
                    confirmPasswordError &&  <p className='text-danger'>{confirmPasswordError}</p>
                  }
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
