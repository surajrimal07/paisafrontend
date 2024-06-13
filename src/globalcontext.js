import React, { createContext, useState } from 'react';

export const GlobalContext = createContext({
  email: 'suraj@rimal.com',
  password: '111111',
  setPassword: () => { },
  setEmail: () => { },
  isUserLoggedIn: false,
  isSocketConnected: false,
  XSRFToken: '',
});

export const GlobalProvider = ({ children }) => {
  const [email, setEmail] = useState('suraj@rimal.com');
  const [password, setPassword] = useState('111111');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  return (
    <GlobalContext.Provider value={{ email, setEmail, password, setPassword, isUserLoggedIn, setIsUserLoggedIn, isSocketConnected, setIsSocketConnected }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
