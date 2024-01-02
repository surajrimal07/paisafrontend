// // SignUp.jsx
// import React, { useState } from 'react';
// import h1image from '../../component/images/hilogo.png';
// import './register.css';

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//       fullname: '',
//       email: '',
//       password: '',
//       rePassword: '',
//       agreement: false,
//     });

//     const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: type === 'checkbox' ? checked : value,
//       }));
//     };

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Form submitted:', formData);
//       // Add your form submission logic here
//     };

//     return (
//       <>
//         <div className="content">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-6">
//                 <img src={h1image} alt="Header Image" className="img-fluid" />
//               </div>
//               <div className="col-md-6 contents">
//                 <div className="row justify-content-center">
//                   <div className="col-md-8">
//                     <div className="mb-4">
//                       <h3>Sign Up</h3>
//                       <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                       {['Full Name', 'Email', 'Password', 'rePassword'].map((fieldName) => (
//                         <div key={fieldName} className={`form-group first ${formData[fieldName] ? 'field--not-empty' : ''}`}>
//                           <label htmlFor={fieldName}>{fieldName === 'rePassword' ? 'Re-type Password' : fieldName}</label>
//                           <input
//                             type={fieldName === 'email' ? 'email' : fieldName === 'password' || fieldName === 'rePassword' ? 'password' : 'text'}
//                             className="form-control"
//                             id={fieldName}
//                             name={fieldName}
//                             value={formData[fieldName]}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                       ))}
// <div className="checkbox-container">
//   <input
//     type="checkbox"
//     name="agreement"
//     checked={formData.agreement}
//     onChange={handleChange}
//   />
//   <span>Creating an account means you're okay with our <a href="#">Terms and Conditions</a></span>
// </div>
// <input type="submit" value="Register" className="btn btn-block btn-primary" style={{ width: '100%' }} />
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   export default SignUp;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUser } from '../../apis/api.js';
import h1image from '../../component/images/hilogo.png';
import './register.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    rePassword: '',
    agreement: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const errors = {};

    for (const key in formData) {
      const value = formData[key];

      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[key] = `Please enter your ${key}`;
      }
    }

    if (formData.password !== formData.rePassword) {
      errors.rePassword = 'Passwords do not match';
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
      const response = await RegisterUser({
        name: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.rePassword,
      });

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

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={h1image} alt="Header Image" className="img-fluid" />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Sign Up</h3>
                    <p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                  </div>
                  <form onSubmit={handleSubmit}>
{['Full Name', 'Email', 'Password', 'rePassword'].map((fieldName) => (
  <div key={fieldName} className={`form-group first ${formData[fieldName] !== '' ? 'field--not-empty' : ''}`}>
    <label htmlFor={fieldName}>{fieldName === 'rePassword' ? 'Re-type Password' : fieldName}</label>
    <input
      type={(fieldName === 'password' || fieldName === 'rePassword') ? 'password' : 'text'}
      className="form-control"
      id={fieldName}
      name={fieldName}
      value={formData[fieldName]}
      onChange={handleChange}
      required
    />
    {formErrors[fieldName] && <p className='text-danger'>{formErrors[fieldName]}</p>}
  </div>
))}

                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                      />
                      <span>Creating an account means you're okay with our <a href="#">Terms and Conditions</a></span>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default SignUp;
