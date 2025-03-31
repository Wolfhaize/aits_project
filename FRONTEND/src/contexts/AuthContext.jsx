import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isLoggedIn: !!localStorage.getItem("authToken"),
    user: JSON.parse(localStorage.getItem("userData") || "null"),
  });

  const login = (userData) => {
    // Log userData to ensure it's correct
    console.log("User Data:", userData);
  
    const userToStore = {
      id: userData.id,
      username: userData.username,
      first_name: userData.first_name || "Unknown", // Provide fallback
      last_name: userData.last_name || "User",
      student_number: userData.student_number,
      token: userData.token,
    };
  
    // Log userToStore to verify structure
    console.log("User to Store:", userToStore);
  
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userToStore));
  
    setAuthState({
      isLoggedIn: true,
      user: userToStore,
    });
  };
  

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        user: authState.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
