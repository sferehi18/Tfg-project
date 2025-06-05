import axios from "axios";
import { useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

export function useAuth() {
const {token,setNewToken,setExpiredMsg} = useContext(TokenContext);
const {setUser} = useContext(UserContext);
const navigate = useNavigate();
  const login = async (authUser) => {
    return axios
      .post("http://localhost:8080/auth/login", 
       authUser,{withCredentials: true}
      )
      .then((response) => {
        // El token es directamente el `response.data`

       localStorage.setItem("userDetails",JSON.stringify(response.data));
        setUser(response.data);
        return response.status; // Aquí no necesitamos acceder a `response.data.token`
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
        throw error; // Lanza el error para que puedas manejarlo en el componente donde se llama
      });
  };

 const redirectToLogin = () => {
    // Redirige al usuario a la página de inicio de sesión
    if(err.response?.status === 401 || err.response?.status === 403){
      setExpiredMsg("Tu sesión ha expirado, por favor inicia sesión de nuevo");
      navigate("/login");
    }
    
   
  }

  const createUser = async (user) =>{
    return axios.post("http://localhost:8080/auth/register",user).then((response)=>{
      return response.status;
    }
    ).catch((err) =>{
      console.log(err);
    })
  }

  const logout = async () =>{
    await axios.post("http://localhost:8080/auth/logout").then((response)=>{
      if(response.status === 200){
        localStorage.removeItem("isAuthenticated");
        setUser(null);
        localStorage.removeItem("userDetails");
        
         // Elimina el estado de autenticación del localStorage
    setExpiredMsg('');
    localStorage.setItem("selectedButton","Home")
    
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

  return { logout, validateUser, invalidUserOrPasswordError,createUser,redirectToLogin,login };
}