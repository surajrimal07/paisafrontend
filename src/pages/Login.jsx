import React, { useState } from 'react';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>10Paisa Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

//module.exports = Login();

export default Login;
