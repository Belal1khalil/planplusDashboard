import React, { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null);

  useEffect(() => {
  localStorage.getItem("token") 
  setToken(localStorage.getItem("token"));
  }, [token]);


 function logout() {
  localStorage.removeItem("token");
  setToken(null);
}

  return (
    <>
      <AuthContext.Provider value={{ token, setToken ,logout }}>

        {children}
      </AuthContext.Provider>
    </>
  );
}
