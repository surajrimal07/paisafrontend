import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import App from './App';
import { GlobalProvider } from './globalcontext';
import { WebSocketProvider } from './component/websocket/websocket.jsx';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

//removed <React.StrictMode> from the render method to fix bug of rendering components twice

root.render(
  <HelmetProvider>
    <Helmet>
      <meta
        httpEquiv="Content-Security-Policy"
        content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' https://apis.google.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://unpkg.com;
          img-src 'self' data: https://res.cloudinary.com https://*.tile.openstreetmap.org https://unpkg.com;
          connect-src 'self' https://api.zorsha.com.np/ https://localhost:4000 wss://socket.zorsha.com.np/ wss://localhost:8081/;
          font-src 'self' https://fonts.gstatic.com;
          object-src 'none';
          frame-ancestors 'self' https://www.google.com https://chukul.com/;
          base-uri 'self';
          form-action 'self';
          frame-src 'self' https://www.google.com https://chukul.com/;
        "
      />
    </Helmet>
    <GlobalProvider>
    <WebSocketProvider>
      <App />
      </WebSocketProvider>,
    </GlobalProvider>
  </HelmetProvider>
);