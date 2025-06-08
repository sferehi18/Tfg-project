import axios from "axios";
import { useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useUsers } from "./UseResources";
import ToastContext from "../context/ToastContext";
export function useAuth() {
const {token,setNewToken,setExpiredMsg,setAvatar} = useContext(TokenContext);
const {getpfp} = useUsers();
const {setUser} = useContext(UserContext);
const {handleShow} = useContext(ToastContext);
const navigate = useNavigate();
  const login = async (authUser) => {
    return axios
      .post("http://localhost:8080/auth/login", 
       authUser,{withCredentials: true}
      )
      .then((response) => {
        // El token es directamente el `response.data`
        
       localStorage.setItem("userDetails",JSON.stringify(response.data));
       localStorage.setItem("selectedButton","Home")
        setUser(response.data);
         
        return response.status; 
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
        throw error; // Lanza el error para que puedas manejarlo en el componente donde se llama
      });
  };



  const createUser = async (user) =>{
    return axios.post("http://localhost:8080/auth/register",user).then((response)=>{
      return response;
    }
    ).catch((err) =>{
      console.error("Error al crear el usuario:", err.response);
     return err.response;
    })
  }

  const logout = async () =>{
    await axios.post("http://localhost:8080/auth/logout",
      {
      },
      {
        withCredentials:true}
    ).then((response)=>{
      if(response.status === 200){
        console.log("ADIOS")
        localStorage.removeItem("isAuthenticated");
        setUser(null);
        localStorage.removeItem("userDetails");
        
         // Elimina el estado de autenticación del localStorage
    setExpiredMsg('');
    
    
      }
    })
   
  }



 
  
  
  const validateUser = async (authUser) => {
   return axios
      .post("http://localhost:8080/auth/validate", 
       authUser
      )
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error("Error al obtener el usuario:", error);
        throw error; // Lanza el error para que puedas manejarlo en el componente donde se llama
      });

  }

  
  // Manejo de errores
  const invalidUserOrPasswordError =  {
    //Establece un tipo de error específico personalizado distinto de los ya existentes en useForm
        type: "manual",
        message: "Usuario o contraseña incorrectos",
      }

  return { logout, validateUser, invalidUserOrPasswordError,createUser,login };
}