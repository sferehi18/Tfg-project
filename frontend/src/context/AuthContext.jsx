import React from "react";
import { createContext, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useLogin";
import { jwtDecode } from "jwt-decode";
import { useUsers } from "../hooks/UseResources";
import { use } from "react";
// 1. Crear el contexto
const TokenContext = createContext();
export function TokenProvider({ children }) {

const {getpfp} = useUsers();
const [expiredMsg,setExpiredMsg] = useState('');
const [isAuthenticated, setAuthenticated] = useState(() => {
  const saved = localStorage.getItem('isAuthenticated');
  return saved ? JSON.parse(saved) : false;
});
const [avatar, setAvatar] = useState();

useEffect( () =>{

  getpfp().then((url) => setAvatar(url));

},[avatar])


// Cada vez que se recarga la pagina se asegura
//de que no se pierda el valor del token del Contexto de la app


    

    return (
      <TokenContext.Provider value={{ expiredMsg,setExpiredMsg, isAuthenticated,setAuthenticated,avatar,setAvatar }}>
        {children}
      </TokenContext.Provider>
    );}

export default TokenContext;

