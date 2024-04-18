import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUser, forgetPassword, loginUser, otpLogin, otpVerify, savePassword, verifyEmail, verifyName, verifyPassword, verifyPhone } from '../../apis/api';
import logo from '../../component/images/hilogo.png';
import './login2.css';

const Login = () => {
  const [emailotpsent, setEmailOTPSent] = useState('');
  const [emailotpverified, setEmailOTPVerified] = useState('');
  const [forgetotpsent , setForgetOTPSent] = useState('');
  const [forgetotpverified, setForgetOTPVerified] = useState('');
  const [email, setEmail] = useState('suraj@rimal.com');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('111111');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  //ServerSide validations
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  //store validations state
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);


  const showRegister = location.state && location.state.showRegister;

  const [showLogin, setShowLogin] = useState(!showRegister);

  const [showResetForm, setShowResetForm] = useState(false);

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
        const jsonDecode = JSON.stringify(responseData);
        localStorage.setItem('user', jsonDecode);
        setTimeout(() => {
          if (responseData.isAdmin) {

            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
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

  const handleEmailValidate = async (email) => {
    const data = {
      email
    };
    try {
        const res = await verifyEmail(data);
        setEmailError(res.data.message);
     //   console.log(res);
        setEmailValid(res.status === 200);
     //   console.log('email error status is ' + emailValid)
    } catch (error) {
    //  console.log(error);
      setEmailError(error.response.data.message);
      setEmailValid(false);
     // console.log('email error status is ' + emailValid)
    }
};

const handleNameValidate = async (name) => {
  const data = {
    name
  };
  try {
      const res = await verifyName(data);
      setNameError(res.data.message);
      console.log(res);
  } catch (error) {
    console.log(error);
      setNameError(error.response.data.message);
  }
};

const handlePhoneValidate = async (phone) => {
  const res = await verifyPhone(phone);
  setPhoneError(res.data.message);
};

const handlePasswordValidate = async (password) => {
  const res = await verifyPassword(password);
  setPasswordError(res.data.message);
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

      const { message } = response.data;

      if (response.status === 200 || (response.data && response.data.message === 'Success')) {
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

const hangleForgetPasswordSubmit = async (event) => {
  event.preventDefault();

  // if (!validateEmail(email)) {
  //   toast.error('Please enter a valid email');
  //   return;
  // }

  toast.info('Please Wait...');

  try {
    const response = await forgetPassword({ email });

    const { success, message, data } = response.data;
    if (success) {

      localStorage.setItem('hash', data);
      localStorage.setItem('email', email);
      toast.success(message);
      setForgetOTPSent(true);

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

const handleOTPVerification = async (event) => {
  event.preventDefault();

  if (!validateOTP(otp)) {
    toast.error('Please enter a valid OTP');
    return;
  }

  try {
    const response = await otpVerify({ email, otp, hash: localStorage.getItem('hash')});

    if (response.status === 200 || (response.data && response.data.message === 'Success')) {

      toast.success("Please Enter New Password");
      setForgetOTPVerified(true);
    }
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An error occurred.';
    toast.error(errorMessage);
  }
};


const handlePasswordchange = async () => {

  if (!password || password.trim() === '' || password.length < 6){
    toast.error('Please enter a valid passowrd');
    return;
  }

  const email = localStorage.getItem('email');
  const field = "password";
  const value = password;

  try {
    const response = await savePassword({ email, field, value});

    const { message } = response.data;
    if (response.status === 200 || (response.data && response.data.message === 'Success')) {
      toast.success(message);
      setShowResetForm(false);
      setForgetOTPSent(false);
      setForgetOTPVerified(false);

    }
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An error occurred.';
    toast.error(errorMessage);
  }
};

const handleForgetPasswordClick = () => {
  setPassword('');
  setShowResetForm(true);
};

const handleGoBackToLoginClick = () => {
  setShowResetForm(false);
  setForgetOTPSent(false);
  setForgetOTPVerified(false);
};

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


const validateOTP = (otp) => {
const re = /^[0-9]{4}$/;
return re.test(otp);
}

  return (
    <div id="login-container">
    <div className={`container2 ${showLogin ? '' : 'active'}`} id="container2">

        <div className="form-container sign-in">
          <form onSubmit={(e) => {
  e.preventDefault();
  if (showResetForm) {
    if (forgetotpsent) {
      if (forgetotpverified) {
        handlePasswordchange(e);
      } else {
        handleOTPVerification(e);
      }
    } else {
      hangleForgetPasswordSubmit(e);
    }
  } else {
    handleLoginSubmit(e);
  }
}}>
            <h1>{showResetForm? 'Forget Password' : 'Sign In'}</h1>

            {!showResetForm ? (
  <span>Use your 10Paisa email and password to login</span>
) : (
  <span>Enter your email to reset your password</span>
)}
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Email"
              data-testid="email-input"
            />

{forgetotpsent && !forgetotpverified && (

      <input
        type="text"
        id="otp"
        placeholder="Enter OTP"
        name="otp"
        value={otp}
        onChange={handleOTPChange}
        required
      />
  )}

{(!showResetForm || (showResetForm && forgetotpverified)) && (
  <input
    type="password"
    id="password"
    className="form-control"
    value={password}
    onChange={handlePasswordChange}
    required
    placeholder="Password"
  />
)}

<button
  type="button"
  onClick={showResetForm ? handleGoBackToLoginClick : handleForgetPasswordClick}
  style={{
    background: 'none',
    border: 'none',
    padding: 0,
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'black',
    textTransform: 'none',
  }}
>
  {showResetForm ? 'Back to Login' : 'Forget Password?'}
</button>

{forgetotpsent && !forgetotpverified && (
  <p
    style={{ cursor: 'pointer', textDecoration: 'underline' }}
    onClick={hangleForgetPasswordSubmit}
  >
    Didn't receive OTP? Resend OTP.
  </p>
)}

<button type="submit" className="btn btn-primary btn-block" data-testid="sign-in-button">

  {showResetForm
    ? forgetotpsent
      ? forgetotpverified
        ? 'Save Password'
        : 'Verify OTP'
      : 'Send Email OTP'
    : 'Sign In'}
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
        required
        onChange={(e) => {
          handleEmailChange(e);
          handleEmailValidate(e.target.value);
        }}
        data-testid="email-input-signup"
      />

    <span className="tooltisp" style={{ position: 'absolute', right: '160px',top: '295px' }}>
                {emailValid ? (
                    <FaCheckCircle style={{ color: 'green', marginLeft: '1px' }} />
                ) : (
                    <FaTimesCircle style={{ color: 'red', marginLeft: '1px' }} />
                )}
            </span>

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
        onChange={(e) => {
          handleNameChange(e);
          handleNameValidate(e.target.value);
        }}
      />
        <div>{nameError}</div>
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
  <button type="submit" data-testid="sign-up-button">
    {emailotpsent
      ? emailotpverified
        ? 'Submit'
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
    <img
    src={logo}
    alt="10Paisa Logo"
    className="logo"
    style={{ maxWidth: '150px', maxHeight: '150px' }}
  />
      <h1>Welcome to 10Paisa🚀</h1>
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

    {showResetForm ? (
  <>
  <img
    src={logo}
    alt="10Paisa Logo"
    className="logo"
    style={{ maxWidth: '150px', maxHeight: '150px' }}
  />
     <h1>Forget Password</h1>
    <p>Enter your email address to reset your password</p>
    <ol>
      <li>Enter your email</li>
      <li>Receive OTP in your email</li>
      <li>Verify OTP to reset your password</li>
    </ol>
  </>
) : (
  <>
  <img
    src={logo}
    alt="10Paisa Logo"
    className="logo"
    style={{ maxWidth: '150px', maxHeight: '150px' }}
  />
    <h1>Welcome to 10Paisa🚀</h1>
    <p>Enter your 10Paisa email and password to login</p>
    <ol>
      <li>Enter your 10Paisa email and password</li>
    </ol>
  </>
)}
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