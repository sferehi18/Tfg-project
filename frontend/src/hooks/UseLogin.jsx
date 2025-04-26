import axios from "axios";

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
  

  return { getToken };
}