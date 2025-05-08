import axios from "axios";
import { Navigate } from "react-router-dom";

export function useAuth() {
  const getToken = () => {
    return axios
      .post("http://localhost:8080/auth/login", {
        username: "Santiago",
        password: "123",
      })
      .then((response) => {
        // El token es directamente el `response.data`
        return response.data; // Aquí no necesitamos acceder a `response.data.token`
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
        throw error; // Lanza el error para que puedas manejarlo en el componente donde se llama
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.close();
    // Navigate("auth/login") // Redirige a la página de inicio de sesión
    
    // Aquí puedes agregar cualquier otra lógica de cierre de sesión que necesites
  };
  

  return { getToken ,logout};
}