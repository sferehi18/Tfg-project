import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../context/AuthContext";


export function useAuth() {
const {token,setNewToken,setExpiredMsg} = useContext(TokenContext);
  const getToken = async (authUser) => {
    return axios
      .post("http://localhost:8080/auth/login", 
       authUser
      )
      .then((response) => {
        // El token es directamente el `response.data`
        return response.data; // Aquí no necesitamos acceder a `response.data.token`
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
        throw error; // Lanza el error para que puedas manejarlo en el componente donde se llama
      });
  };

  const createUser = async (user) =>{
    return axios.post("http://localhost:8080/auth/register",user).then((response)=>{
      return response.status;
    }
    ).catch((err) =>{
      console.log(err);
    })
  }


  const logout = () => {

    
    setNewToken(null);
    setExpiredMsg('');
   
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

  return { getToken ,logout, validateUser, invalidUserOrPasswordError,createUser};
}