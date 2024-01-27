import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { otpLogin } from '../../apis/api';
import './login2.css';

const ForgetPassword = ({ handleBackToLoginClick }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmailOTP = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    toast.info('Please Wait...');
    try {
      const response = await otpLogin({ email });

      const { success, message, hash } = response.data;

      if (success) {
        localStorage.setItem('hash', hash);
        localStorage.setItem('email', email);
        toast.success(message);
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
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="form-container forget-password">
      <form onSubmit={handleSendEmailOTP}>
        <h1>Forgot Password</h1>
        <span>Enter your email to reset your password</span>
        <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Email"
            />
        <button type="submit" className="btn btn-primary btn-block">
          Send Reset OTP
        </button>
        <button
          type="button"
          onClick={handleBackToLoginClick}
          className="btn btn-secondary btn-block"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
