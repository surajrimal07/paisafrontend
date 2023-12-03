import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import RegisterUser from '../apis/api.js';

const Register = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(phone) || phone.length !== 10) {
      console.error('Invalid phone number. Please enter a 10-digit numeric phone number.');
      return;
    }

    const data = {
      name: name,
      phone: phone,
      email: email,
      password: password
    }

    RegisterUser(data).then((respose) => {
      if (respose.status === 'success') {
        toast.success("Successfully registered");
        console.log("success");
      } else if (respose.status === 'duplicate') {
        toast.error("Email already exists");
        console.log("failed 400");
      } else {
        toast.error("Server Error");
        console.log(respose.data);
      }
    });

    console.log('Registering with:', { name, phone, email, password });
  };

  return (
    <div className="App">
      <div className="register-container">
        <h2>10Paisa Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group inline">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group inline">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="form-group inline">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group inline">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
