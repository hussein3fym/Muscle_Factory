import React, { createContext, useContext, useState, useEffect } from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to track the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set authentication data
  const setAuth = (authData) => {
    // Set authentication data and update isLoggedIn state
    // You can modify this function according to your authentication logic
    // For now, let's just set isLoggedIn to true
    setIsLoggedIn(true);
    // You might want to store authData in localStorage or sessionStorage as well
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role[0] === "User") {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    history.push("/login"); // Redirect to the login page
  };

  // Provide the isLoggedIn state, setAuth function, and handleLogout function to the children
  const contextValue = {
    isLoggedIn,
    setAuth,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
