import DOMPurify from "dompurify";
import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  FetchXSRFToken,
  RegisterUser,
  api,
  forgetPassword,
  loginUser,
  otpLogin,
  otpVerify,
  savePassword,
  verifyEmail,
  verifyName,
  verifyPassword,
  verifyPhone,
} from "../../apis/api";
import logo from "../../component/images/hilogo.png";
import { GlobalContext } from "../../globalcontext.js";
import "./login2.css";

const Login = () => {
  const [emailotpsent, setEmailOTPSent] = useState("");
  const [emailotpverified, setEmailOTPVerified] = useState("");
  const [forgetotpsent, setForgetOTPSent] = useState("");
  const [forgetotpverified, setForgetOTPVerified] = useState("");
  const { email, setEmail } = useContext(GlobalContext);
  const [otp, setOTP] = useState("");
  const { password, setPassword } = useContext(GlobalContext);
  const { setIsUserLoggedIn } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //ServerSide validations
  const [emailError, setEmailError] = useState("Please Enter Email");
  const [passwordError, setPasswordError] = useState("Please Enter Password");
  const [nameError, setNameError] = useState("Please Enter Name");
  const [phoneError, setPhoneError] = useState("Please Enter Phone");
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    "Please Enter Confirm Password"
  );

  //store validations state
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const showRegister = location.state && location.state.showRegister;

  const [showLogin, setShowLogin] = useState(!showRegister);

  const [showResetForm, setShowResetForm] = useState(false);
  const [strength, setStrength] = useState("");
  const [xsrfToken, setXSRFToken] = useState("");
  const [strengthColor, setStrengthColor] = useState("black");

  useEffect(() => {
    const fetchXSRFToken = async () => {
      try {
        await FetchXSRFToken();

        const xsrf = secureLocalStorage.getItem("xsrftoken");
        setXSRFToken(xsrf);

        api.interceptors.request.use((config) => {
          config.headers[
            "Authorization"
          ] = `Bearer ${secureLocalStorage.getItem("authtoken")}`;
          config.headers["xsrf-token"] = xsrf;
          return config;
        });
      } catch (err) {
        console.log(err);
        toast.error("An error occurred while fetching XSRF token.");
      }
    };
    fetchXSRFToken();
  }, []);

  const handleEmailChange = (event) => {
    event.preventDefault();
    const cleanEmail = sanitizeInput(event.target.value);
    setEmail(cleanEmail);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const cleanPassword = sanitizeInput(event.target.value);
    setStrength(evaluatePasswordStrength(cleanPassword));
    setPassword(cleanPassword);
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const handlePasswordValidate = async (password, email, name) => {
    const data = {
      password,
      email,
      name,
    };

    try {
      const res = await verifyPassword(data);
      setPasswordError(res.data.message);
      setPasswordValid(res.status === 200);
    } catch (error) {
      setPasswordError(error.response.data.message);
      setPasswordValid(false);
    }
  };

  const handleNameChange = (event) => {
    const cleanName = sanitizeInput(event.target.value);
    setName(cleanName);
  };

  const handlePhoneChange = (event) => {
    const cleanPhone = sanitizeInput(event.target.value);
    setPhone(cleanPhone);
  };

  const handleConfirmPasswordChange = (event) => {
    const cleanConfirmPassword = sanitizeInput(event.target.value);
    setConfirmPassword(cleanConfirmPassword);
  };

  const handleRegisterButtonClick = () => {
    setShowLogin(false);
  };

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  };

  function evaluatePasswordStrength(password) {
    const hasLengthRequirement = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(password);
    const hasConsecutiveChars = /(.\w).\1{2,}/.test(password);
    const hasWhitespace = /\s/.test(password);

    let score = 0;

    // Length requirement
    if (hasLengthRequirement) {
      score += 1;
    }

    // Character types
    const characterTypesCount =
      hasUppercase + hasLowercase + hasDigits + hasSpecialChars;
    score += characterTypesCount;

    // Consecutive characters
    if (!hasConsecutiveChars) {
      score += 1;
    }

    // Whitespace
    if (!hasWhitespace) {
      score += 1;
    }

    // Assign color based on score
    let color;
    switch (score) {
      case 0:
      case 1:
        color = "red";
        break;
      case 2:
      case 3:
        color = "orangered";
        break;
      case 4:
        color = "orange";
        break;
      case 5:
        color = "yellowgreen";
        break;
      case 6:
      case 7:
        color = "green";
        break;
      default:
        color = "red";
    }

    setStrengthColor(color);
    return (score / 7) * 100; // Return a percentage score
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      _csrf: xsrfToken,
    };

    try {
      const res = await loginUser(data);
      const { success, message, data: responseData } = res.data;

      if (success) {
        toast.success(message);
        const jsonDecode = JSON.stringify(responseData);
        secureLocalStorage.setItem("user", jsonDecode);
        setIsUserLoggedIn(true);
        setTimeout(() => {
          if (responseData.isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleEmailValidate = async (email) => {
    const data = {
      email,
    };
    try {
      const res = await verifyEmail(data);
      setEmailError(res.data.message);
      setEmailValid(res.status === 200);
    } catch (error) {
      setEmailError(error.response.data.message);
      setEmailValid(false);
    }
  };

  const handleNameValidate = async (name) => {
    const data = {
      name,
    };
    try {
      const res = await verifyName(data);
      setNameError(res.data.message);
      setNameValid(res.status === 200);
    } catch (error) {
      setNameError(error.response.data.message);
      setNameValid(false);
    }
  };

  const handlePhoneValidate = async (phone) => {
    const data = {
      phone: Number(phone),
    };

    try {
      const res = await verifyPhone(data);
      setPhoneError(res.data.message);
      setPhoneValid(res.status === 200);
    } catch (error) {
      setPhoneError(error.response.data.message);
      setPhoneValid(false);
    }
  };

  const handleConfirmPasswordValidate = async (confirmPassword, passowrd) => {
    if (confirmPassword === passowrd && passwordValid) {
      setConfirmPasswordError("Password Matched");
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordError("Password Not Matched");
      setConfirmPasswordValid(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      phone,
      email: secureLocalStorage.getItem("email"),
      password,
      confirmPassword,
    };

    try {
      const response = await RegisterUser(formData);
      toast.success(response.data.message);
      if (response.data.success) {
        const { token } = response.data.data.token;
        secureLocalStorage.setItem("authtoken", token);
        const jsonDecode = JSON.stringify(response.data.data);
        //localStorage.setItem("user", jsonDecode);
        secureLocalStorage.setItem("user", jsonDecode);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleOTPChange = (event) => {
    const cleanOTP = sanitizeInput(event.target.value);
    setOTP(cleanOTP);
  };

  const handleSendEmailOTP = async (event) => {
    event.preventDefault();

    toast.info("Please Wait...");
    try {
      const response = await otpLogin({ email });

      const { success, message, hash } = response.data;

      if (success) {
        //localStorage.setItem("hash", hash);
        //localStorage.setItem("email", email);

        secureLocalStorage.setItem("hash", hash);
        secureLocalStorage.setItem("email", email);

        toast.success(message);
        setEmailOTPSent(true);
      } else {
        toast.error(message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleVerifyEmailOTP = async (event) => {
    event.preventDefault();

    if (!validateOTP(otp)) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      const response = await otpVerify({
        email,
        otp,
        hash: secureLocalStorage.getItem("hash"),
      });

      const { message } = response.data;

      if (
        response.status === 200 ||
        (response.data && response.data.message === "Success")
      ) {
        toast.success(message);
        setEmailOTPVerified(true);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleResendOTP = async (event) => {
    toast.info("Please Wait...");
    try {
      const response = await otpLogin({ email });

      const { success, message, hash } = response.data;

      if (success) {
        // localStorage.setItem("hash", hash);
        //localStorage.setItem("email", email);

        secureLocalStorage.setItem("hash", hash);
        secureLocalStorage.setItem("email", email);
        toast.success(message);
        setEmailOTPSent(true);
      } else {
        toast.error(message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const hangleForgetPasswordSubmit = async (event) => {
    event.preventDefault();
    toast.info("Please Wait...");

    try {
      const response = await forgetPassword({ email });

      const { success, message, data } = response.data;
      if (success) {
        // localStorage.setItem("hash", data);
        //localStorage.setItem("email", email);

        secureLocalStorage.setItem("hash", data);
        secureLocalStorage.setItem("email", email);

        toast.success(message);
        setForgetOTPSent(true);
      } else {
        toast.error(message);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleOTPVerification = async (event) => {
    event.preventDefault();

    if (!validateOTP(otp)) {
      toast.error("Please enter a valid OTP");
      return;
    }

    try {
      const response = await otpVerify({
        email,
        otp,
        hash: secureLocalStorage.getItem("hash"),
      });

      if (
        response.status === 200 ||
        (response.data && response.data.message === "Success")
      ) {
        toast.success("Please Enter New Password");
        setForgetOTPVerified(true);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handlePasswordchange = async () => {
    if (!password || password.trim() === "" || password.length < 6) {
      toast.error("Please enter a valid passowrd");
      return;
    }

    const email = secureLocalStorage.getItem("email");
    const field = "password";
    const value = password;

    try {
      const response = await savePassword({ email, field, value });

      const { message } = response.data;
      if (
        response.status === 200 ||
        (response.data && response.data.message === "Success")
      ) {
        toast.success(message);
        setShowResetForm(false);
        setForgetOTPSent(false);
        setForgetOTPVerified(false);
      }
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleForgetPasswordClick = () => {
    setPassword("");
    setShowResetForm(true);
  };

  const handleGoBackToLoginClick = () => {
    setShowResetForm(false);
    setForgetOTPSent(false);
    setForgetOTPVerified(false);
  };

  const validateOTP = (otp) => {
    const re = /^[0-9]{4}$/;
    return re.test(otp);
  };

  return (
    <div id="login-container">
      <div
        className={`container2 ${showLogin ? "" : "active"}`}
        id="container2"
      >
        <div className="form-container sign-in">
          <form
            onSubmit={(e) => {
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
            }}
          >
            <h1>{showResetForm ? "Forget Password" : "Sign In"}</h1>

            {!showResetForm ? (
              <span>Use your 10Paisa email and password to login</span>
            ) : (
              <span>Enter your email to reset your password</span>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                width: "80%",
              }}
            >
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  handleEmailChange(e);
                  handleEmailValidate(e.target.value);
                }}
                required
                placeholder="Email"
                data-testid="email-input"
              />

              <span
                className="tooltisp"
                style={{ position: "absolute", right: "5px" }}
              >
                {!emailValid && emailError === "Email already exists" ? (
                  <FaCheckCircle
                    style={{ color: "green", marginLeft: "5px" }}
                  />
                ) : (
                  <FaTimesCircle style={{ color: "red", marginLeft: "5px" }} />
                )}
              </span>
            </div>

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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  width: "80%",
                }}
              >
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Password"
                />
              </div>
            )}

            <button
              type="button"
              onClick={
                showResetForm
                  ? handleGoBackToLoginClick
                  : handleForgetPasswordClick
              }
              style={{
                background: "none",
                border: "none",
                padding: 0,
                textDecoration: "underline",
                cursor: "pointer",
                color: "black",
                textTransform: "none",
              }}
            >
              {showResetForm ? "Back to Login" : "Forget Password?"}
            </button>

            {forgetotpsent && !forgetotpverified && (
              <p
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={hangleForgetPasswordSubmit}
              >
                Didn't receive OTP? Resend OTP.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              data-testid="sign-in-button"
              disabled={emailValid}
            >
              {showResetForm
                ? forgetotpsent
                  ? forgetotpverified
                    ? "Save Password"
                    : "Verify OTP"
                  : "Send Email OTP"
                : "Sign In"}
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
                  ? "Complete Registration"
                  : "Verify OTP"
                : "Verify Email"}
            </h1>
            {!emailotpsent && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  width: "80%",
                }}
              >
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
                <span
                  className="tooltisp"
                  style={{ position: "absolute", right: "5px" }}
                >
                  {emailValid ? (
                    <FaCheckCircle
                      style={{ color: "green", marginLeft: "1px" }}
                    />
                  ) : (
                    <FaTimesCircle
                      style={{ color: "red", marginLeft: "1px" }}
                    />
                  )}
                  <span className="tooltiptext">{emailError}</span>
                </span>
              </div>
            )}

            {emailotpsent && !emailotpverified && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  width: "80%",
                }}
              >
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "90%",
                  }}
                >
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
                  <span
                    className="tooltisp"
                    style={{ position: "absolute", right: "10px" }}
                  >
                    {nameValid ? (
                      <FaCheckCircle
                        style={{ color: "green", marginLeft: "1px" }}
                      />
                    ) : (
                      <FaTimesCircle
                        style={{ color: "red", marginLeft: "1px" }}
                      />
                    )}
                    <span className="tooltiptext">{nameError}</span>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "90%",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    pattern="^[0-9]{10}$"
                    minLength="10"
                    maxLength="10"
                    value={phone}
                    onChange={(e) => {
                      handlePhoneChange(e);
                      handlePhoneValidate(e.target.value);
                    }}
                  />
                  <span
                    className="tooltisp"
                    style={{ position: "absolute", right: "10px" }}
                  >
                    {phoneValid ? (
                      <FaCheckCircle
                        style={{ color: "green", marginLeft: "1px" }}
                      />
                    ) : (
                      <FaTimesCircle
                        style={{ color: "red", marginLeft: "1px" }}
                      />
                    )}
                    <span className="tooltiptext">{phoneError}</span>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "90%",
                  }}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      handlePasswordChange(e);
                      handlePasswordValidate(e.target.value, email, name);
                    }}
                  />
                  <span
                    className="tooltisp"
                    style={{ position: "absolute", right: "10px" }}
                  >
                    {passwordValid ? (
                      <FaCheckCircle
                        style={{ color: "green", marginLeft: "1px" }}
                      />
                    ) : (
                      <FaTimesCircle
                        style={{ color: "red", marginLeft: "1px" }}
                      />
                    )}
                    <span className="tooltiptext">{passwordError}</span>
                  </span>
                </div>

                <div
                  style={{
                    width: "90%",
                    height: "2px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "5px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    style={{
                      width: `${strength}%`,
                      height: "100%",
                      backgroundColor: strengthColor,
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: "90%",
                  }}
                >
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      handleConfirmPasswordChange(e);
                      handleConfirmPasswordValidate(e.target.value, password);
                    }}
                  />
                  <span
                    className="tooltisp"
                    style={{ position: "absolute", right: "10px" }}
                  >
                    {confirmPasswordValid ? (
                      <FaCheckCircle
                        style={{ color: "green", marginLeft: "1px" }}
                      />
                    ) : (
                      <FaTimesCircle
                        style={{ color: "red", marginLeft: "1px" }}
                      />
                    )}
                    <span className="tooltiptext">{confirmPasswordError}</span>
                  </span>
                </div>
              </>
            )}
            <button
              type="submit"
              data-testid="sign-up-button"
              disabled={!emailValid}
            >
              {emailotpsent
                ? emailotpverified
                  ? "Submit"
                  : "Verify OTP"
                : "Verify Email"}
            </button>

            {emailotpsent && !emailotpverified && (
              <p
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={handleResendOTP}
              >
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
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
              <h1>Welcome to 10Paisa🚀</h1>
              <p>
                To register on 10Paisa and unlock all site features, follow
                these steps:
              </p>
              <ol>
                <li>Enter your valid email address</li>
                <li>You will recieve OTP in your email adress</li>
                <li>Confirm your registration by entering the received OTP</li>
                <li>
                  Provide additional details to complete the registration
                  process
                </li>
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
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
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
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
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
    </div>
  );
};

export default Login;
