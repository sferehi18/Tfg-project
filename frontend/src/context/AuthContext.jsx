import React from "react";
import { createContext, useState } from "react";
import { useEffect } from "react";

// 1. Crear el contexto
const TokenContext = createContext();
export function TokenProvider({ children }) {

const [token, setToken] = useState();
 
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    , []);
    const  setNewToken = (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", newToken); // Guardar el nuevo token en localStorage
    }

    return (
      <TokenContext.Provider value={{ token, setNewToken }}>
        {children}
      </TokenContext.Provider>
    );}

export default TokenContext;