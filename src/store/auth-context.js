import React, { useState,useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
localStorage.removeItem('token');
  };
  useEffect(() => {
    const handleUserActivity = () => {
      setLastActiveTime(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      // Clean up event listeners on component unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    const inactivityPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActiveTime >= inactivityPeriod) {
        logoutHandler();
        alert("Your session has expired due to inactivity. Please log in again.");
        clearInterval(checkInactivity);
      }
    }, 1000); // Check every second

    return () => {
      clearInterval(checkInactivity);
    };
  }, [lastActiveTime]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
