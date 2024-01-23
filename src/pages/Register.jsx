// export default Register;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUser } from '../apis/api.js';
import { default as quote1, default as quote2, default as quote3, default as quote4 } from "../component/images/hilogo.png";

const quotes = [
  { image: quote1, text: 'Compound interest is the eighth wonder of the world; he who understands it, earns it, he who doesn’t pays it.' },
  { image: quote2, text: 'An investment in knowledge pays the best interest.' },
  { image: quote3, text: 'Know what you own, and why you own it.' },
  { image: quote4, text: 'The easiest way to manage your money is to take it one step at a time and not worry about being perfect.' },
];


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [currentQuote, setCurrentQuote] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const errors = {};

    for (const key in formData) {
      if (formData[key].trim() === '') {
        errors[key] = `Please enter your ${key}`;
      }
    }

    if (formData.phone.trim() !== '' && formData.phone.length !== 10) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await RegisterUser(formData);

      if (response.data.success) {
        const { token } = response.data.data.token;
        toast.success(response.data.message);
        localStorage.setItem('token', token);
        const jsonDecode = JSON.stringify(response.data.data);
        localStorage.setItem('user', jsonDecode);
        navigate('/dashboard');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'An error occurred.';
      toast.error(errorMessage);
    }
  };


  const handleDotClick = (index) => {
    setCurrentQuote(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img src={quotes[currentQuote].image} alt="Quote" className="img-fluid custom-logo" />
            <p>{quotes[currentQuote].text}</p>
            <div className="dots-container">
              {quotes.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentQuote ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card border-0 shadow-lg bg-light">
            <div className="card-body p-4">
              <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Register</h2>
              <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                  <div className="mb-3" key={key}>
                    <label htmlFor={key} className="form-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </label>
                    <input
                      type={key === 'password' || key === 'confirmPassword' ? 'password' : 'text'}
                      id={key}
                      name={key}
                      className="form-control"
                      value={formData[key]}
                      onChange={handleChange}
                      autoComplete={key === 'email' ? 'new-email' : 'new-password'}
                      required
                    />
                    {formErrors[key] && <p className='text-danger'>{formErrors[key]}</p>}
                  </div>
                ))}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
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
