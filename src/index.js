import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WebSocketProvider } from './component/websocket/websocket.jsx';
import { GlobalProvider } from './globalcontext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

//removed <React.StrictMode> from the render method to fix bug of rendering components twice

root.render(
  <GlobalProvider>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </GlobalProvider>
);