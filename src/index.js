import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


//localStorage.setItem('root', res.data.token);

// const jsonDecode = JSON.stringify(res.data.userdata);
// localStorage.setItem('user',jsonDecode);