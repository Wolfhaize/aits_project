import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Context
const RoleContext = createContext();

// Provider component to wrap around your application
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('student');  // Default to 'student'

  // Use useEffect to load role from localStorage on initial mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to change role and store it in localStorage
  const changeRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole); // Persist role in localStorage
  };

  return (
    <RoleContext.Provider value={{ role, changeRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook to access the Role Context
// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext);
