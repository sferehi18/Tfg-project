import React from "react";
import { createContext, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useLogin";
import { jwtDecode } from "jwt-decode";
// 1. Crear el contexto
const TokenContext = createContext();
export function TokenProvider({ children }) {

const [token, setToken] = useState(localStorage.getItem("token"));
const [expiredMsg,setExpiredMsg] = useState('');
// Cada vez que se recarga la pagina se asegura
//de que no se pierda el valor del token del Contexto de la app
const isTokenValid =  ()=>{
        if(token != null){
    const { exp } = jwtDecode(token); // exp está en segundos
    return Date.now()/1000 < exp ;
        }else{
            return false;
        }};

const isTokenPresent = () =>{
  return token != null;
}
const isTokenExpired = () =>{
   const { exp } = jwtDecode(token); // exp está en segundos
    return Date.now()/1000 > exp ;
}
  
    const  setNewToken = (newToken) => {
      setToken(newToken);

     // Guardar el nuevo token en localStorage
    }

    

    return (
      <TokenContext.Provider value={{ token, setNewToken,isTokenValid,isTokenExpired,isTokenPresent,expiredMsg,setExpiredMsg}}>
        {children}
      </TokenContext.Provider>
    );}

export default TokenContext;