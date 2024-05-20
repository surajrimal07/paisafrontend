import React, { createContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export const GlobalContext = createContext({
    email: 'suraj@rimal.com',
    password: '111111',
    setPassword: () => {},
    setEmail: () => {},
    isUserLoggedIn: false,
    isSocketConnected: false,
  });

  export const GlobalProvider = ({ children }) => {
    const [email, setEmail] = useState('suraj@rimal.com');
    const [password, setPassword] = useState('111111');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const customWebSocketOptions = {
        queryParams: { 'email': email, 'password': password  },
      };

    console.log('customWebSocketOptions:', customWebSocketOptions);

    const { lastMessage } = useWebSocket(
        isUserLoggedIn ? 'wss://socket.zorsha.com.np/' : null,
        customWebSocketOptions
      );

      useEffect(() => {
        setIsSocketConnected(lastMessage !== null);
      }, [lastMessage]);


    return (
      <GlobalContext.Provider value={{ email, setEmail, password, setPassword,isUserLoggedIn, setIsUserLoggedIn, isSocketConnected, setIsSocketConnected }}>
        {children}
      </GlobalContext.Provider>
    );
  };

  export default GlobalProvider;
