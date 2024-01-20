// // Login.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { RegisterUser, loginUser } from '../../apis/api';
// import './login2.css';


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       });

//     const [formErrors, setFormErrors] = useState({});

//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//       };

//       const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//       };
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//         setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//       };

//       const validate = () => {
//         const errors = {};

//         for (const key in formData) {
//           if (formData[key].trim() === '') {
//             errors[key] = `Please enter your ${key}`;
//           }
//         }

//         if (formData.phone.trim() !== '' && formData.phone.length !== 10) {
//           errors.phone = 'Please enter a valid phone number';
//         }

//         if (formData.password !== formData.confirmPassword) {
//           errors.confirmPassword = 'Passwords do not match';
//         }

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//       };

//       const handleRegister = async (event) => {
//         event.preventDefault();

//         if (!validate()) {
//           return;
//         }

//         try {
//           const response = await RegisterUser(formData);

//           if (response.data.success) {
//             const { token } = response.data.data.token;
//             toast.success(response.data.message);
//             localStorage.setItem('token', token);
//             const jsonDecode = JSON.stringify(response.data.data);
//             localStorage.setItem('user', jsonDecode);
//             navigate('/dashboard');
//           } else {
//             toast.error(response.data.message);
//           }
//         } catch (err) {
//           const errorMessage =
//             err.response && err.response.data && err.response.data.message
//               ? err.response.data.message
//               : 'An error occurred.';
//           toast.error(errorMessage);
//         }
//       };


//       const handleSubmit = async (event) => {
//         event.preventDefault();

//         const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//         if (!isEmailValid) {
//           toast.error('Invalid email format');
//           return;
//         }

//         const data = {
//           email,
//           password,
//         };

//         try {
//           const res = await loginUser(data);
//           console.log('API Response:', res);
//           const { success, message, data: responseData } = res.data;

//           if (success) {
//             const { token } = responseData;
//             toast.success(message);
//             localStorage.setItem('token', token);
//             navigate('/admin/dashboard');
//             const jsonDecode = JSON.stringify(responseData);
//             localStorage.setItem('user', jsonDecode);
//           } else {
//             toast.error(message);
//           }
//         } catch (err) {
//           const errorMessage =
//             err.response && err.response.data && err.response.data.message
//               ? err.response.data.message
//               : 'An error occurred.';
//           toast.error(errorMessage);
//           //console.error(errorMessage);
//         }
//       };


//   useEffect(() => {
//     const container2 = document.getElementById('container2');
//     const registerBtn = document.getElementById('register');
//     const loginBtn = document.getElementById('login');


//     const handleRegisterClick = () => {
//       container2.classList.add('active');
//     };

//     const handleLoginClick = () => {
//       container2.classList.remove('active');
//     };

//     registerBtn.addEventListener('click', handleRegisterClick);
//     loginBtn.addEventListener('click', handleLoginClick);

//     // Cleanup event listeners on component unmount
//     return () => {
//       registerBtn.removeEventListener('click', handleRegisterClick);
//       loginBtn.removeEventListener('click', handleLoginClick);
//     };
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   const handleRegisterButtonClick = () => {
//     // Handle the register button click
//     console.log('Register button clicked');
//   };

//   const handleLoginButtonClick = () => {
//     // Handle the login button click
//     console.log('Login button clicked');
//   };

//   return (
//     <div id="login-container">
//     <div className="container2" id="container2">
//     <div className="form-container sign-up">
//       <form onSubmit={handleRegister}>
//         <h1>Sign Up</h1>
//         <span>Please enter your details for registration</span>
//         {/* Include the input fields from the old Register component */}
//         <input
//           type="text"
//           placeholder="Name"
//           name="name" // Add the name attribute for form data
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//         />
//         {formErrors.confirmPassword && (
//           <p className="text-danger">{formErrors.confirmPassword}</p>
//         )}
//         <button onClick={handleRegister} type="submit">Sign Up</button>
//       </form>
//     </div>
//       <div className="form-container sign-in">
//         <form>
//           <h1>Sign In</h1>

//           <span>Use your 10Paisa email and password to login</span>
//           <input
//                     type="email"
//                     id="email"
//                     className="form-control"
//                     value={email}
//                     onChange={handleEmailChange}
//                     required
//                     placeholder="Email"
//                   />
//               <input
//                     type="password"
//                     id="password"
//                     className="form-control"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     required
//                     placeholder="Password"
//                   />
//           <a href="#">Forget Your Password? Reset</a>

//           <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">
//                     Login
//                   </button>
//         </form>
//       </div>
//       <div className="toggle-container">
//         <div className="toggle">
//           <div className="toggle-panel toggle-left">
//             <h1>Welcome Back!</h1>
//             <p>Enter your personal details to use all site features</p>
//             <button className="hidden" id="login">Sign In</button>
//           </div>
//           <div className="toggle-panel toggle-right">
//             <h1>Hello, Friend!</h1>
//             <p>Register with your personal details to use all site features</p>
//             <button className="hidden" id="register" >Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <ToastContainer position="top-right" />
//     </div>
//   );
// };

// export default Login;

// Login.jsx
// Login.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUser, loginUser } from '../../apis/api';
import './login2.css';

const Login = () => {
  const [email, setEmail] = useState('suraj@rimal.com');
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
      console.log('API Response:', res);
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
      email,
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
          <form onSubmit={handleRegisterSubmit}>
            <h1>Sign Up</h1>
            <span>Please enter your details for registration</span>
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
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button
                className="hidden"
                id="login"
                onClick={handleLoginButtonClick}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all site features</p>
              <button
                className="hidden"
                id="register"
                onClick={handleRegisterButtonClick}
              >
                Sign Up
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
