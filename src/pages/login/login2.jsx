import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUser, loginUser, otpLogin, otpVerify } from '../../apis/api';
import './login2.css';

const Login = () => {
  const [emailotpsent, setEmailOTPSent] = useState('');
  const [emailotpverified, setEmailOTPVerified] = useState('');
  const [email, setEmail] = useState('suraj@rimal.com');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('000000');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const showRegister = location.state && location.state.showRegister;

  const [showLogin, setShowLogin] = useState(!showRegister);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegisterButtonClick = () => {
    setShowLogin(false);
  };

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  };

  const validate = () => {
    if (showLogin) {
      return email.trim() !== '' && password.trim() !== '';
    } else {
      return (
        name.trim() !== '' &&
        phone.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        password === confirmPassword
      );
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error('Please enter valid credentials');
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const res = await loginUser(data);
      const { success, message, data: responseData } = res.data;

      if (success) {
        toast.success(message);
        const { token } = responseData;
        localStorage.setItem('token', token);
       // navigate('/admin/dashboard');
        const jsonDecode = JSON.stringify(responseData);
        localStorage.setItem('user', jsonDecode);
        setTimeout(() => {

            navigate('/admin/dashboard');
          }, 1000);

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

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error('Please enter valid registration details');
      return;
    }

    const formData = {
      name,
      phone,
      email : localStorage.getItem('email'),
      password,
      confirmPassword,
    };

    try {
      const response = await RegisterUser(formData);
      toast.success(response.data.message);
      if (response.data.success) {
        const { token } = response.data.data.token;

        localStorage.setItem('token', token);
        const jsonDecode = JSON.stringify(response.data.data);
        localStorage.setItem('user', jsonDecode);
       // navigate('/dashboard');
        setTimeout(() => {
            navigate('/admin/dashboard');
          }, 1000);

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

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
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
        setEmailOTPSent(true);
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


  const handleVerifyEmailOTP = async (event) => {
    event.preventDefault();

    if (!validateOTP(otp)) {
      toast.error('Please enter a valid OTP');
      return;
    }

    try {
      const response = await otpVerify({ email, otp, hash: localStorage.getItem('hash')});

      console.log(response.data);

      const { message } = response.data;

      if (response.status === 200 || (response.data && response.data.message === 'Success')) {
        console.log("test")
        console.log(response.data);
        toast.success(message);
        setEmailOTPVerified(true);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'An error occurred.';
      toast.error(errorMessage);
    }
  };

const handleResendOTP = async (event) => {
  toast.info('Please Wait...');
  try {
    const response = await otpLogin({ email });

    console.log(response.data);

    const { success, message, hash } = response.data;

    if (success) {
      localStorage.setItem('hash', hash);
      localStorage.setItem('email', email);
      toast.success(message);
      setEmailOTPSent(true);
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

}


const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

const validateOTP = (otp) => {
const re = /^[0-9]{4}$/;
return re.test(otp);
}


  //
  return (
    <div id="login-container">
      <div className={`container2 ${showLogin ? '' : 'active'}`} id="container2">
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <span>Use your 10Paisa email and password to login</span>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Password"
            />
            <a href="#">Forget Your Password? Reset</a>
            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Login
            </button>
          </form>
        </div>


        <div className="form-container sign-up">

        <form
  onSubmit={(e) => {
    e.preventDefault();
    if (emailotpsent) {
      if (emailotpverified) {
        handleRegisterSubmit(e);
      } else {
        handleVerifyEmailOTP(e);
      }
    } else {
      handleSendEmailOTP(e);
    }
  }}
>
  <h1>
    {emailotpsent
      ? emailotpverified
        ? 'Complete Registration'
        : 'Verify OTP'
      : 'Verify Email'}
  </h1>
  {!emailotpsent && (
    <div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
    </div>
  )}
  {emailotpsent && !emailotpverified && (
    <div>
      <input
        type="text"
        placeholder="Enter OTP"
        name="otp"
        value={otp}
        onChange={handleOTPChange}
        required
      />
    </div>
  )}
  {emailotpsent && emailotpverified && (
    <>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={handlePhoneChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
    </>
  )}
  <button type="submit">
    {emailotpsent
      ? emailotpverified
        ? 'Complete Registration'
        : 'Verify OTP'
      : 'Verify Email'}
  </button>

  {emailotpsent && !emailotpverified && (
  <p style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleResendOTP}>
    Didn't receive OTP? Resend OTP.
  </p>
)}

</form>






        </div>
        <div className="toggle-container">
  <div className="toggle">
    <div className="toggle-panel toggle-left">
      <h1>Welcome to 10Paisa!</h1>
      <p>To register on 10Paisa and unlock all site features, follow these steps:</p>
      <ol>
        <li>Enter your valid email address</li>
        <li>You will recieve OTP in your email adress</li>
        <li>Confirm your registration by entering the received OTP</li>
        <li>Provide additional details to complete the registration process</li>
      </ol>
      <button
        className="hidden"
        id="login"
        onClick={handleLoginButtonClick}
      >
        Go Back To Sign In Page
      </button>
    </div>
    <div className="toggle-panel toggle-right">
      <h1>Hello, User!</h1>
      <p>For returning users, please enter your login credentials to access all features on 10 Paisa.</p>
      <ol>
        <li>Enter your 10Paisa email and password</li>
      </ol>
      <button
        className="hidden"
        id="register"
        onClick={handleRegisterButtonClick}
      >
        Go to Sign Up Page
      </button>
    </div>
  </div>
</div>





      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;