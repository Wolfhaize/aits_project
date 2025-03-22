import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isLoggedIn: !!localStorage.getItem("authToken"),
    user: JSON.parse(localStorage.getItem("userData") || "null")
  });

  const login = (userData) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setAuthState({
      isLoggedIn: true,
      user: userData
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({
      isLoggedIn: false,
      user: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        user: authState.user,
        login,
        logout
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