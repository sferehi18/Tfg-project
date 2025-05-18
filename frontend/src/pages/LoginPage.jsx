import React from "react";
import { useContext } from "react";
import { get, set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../hooks/useLogin"; // Importamos el hook useAuth
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import TokenContext from "../context/AuthContext";
function LoginPage() {
  const { getToken, validateUser, invalidUserOrPasswordError } = useAuth(); // Importamos el hook useAuth para obtener el token
  const {
    token,
    setNewToken,
    isTokenValid,
    isTokenExpired,
    isTokenPresent,
    expiredMsg,
  } = useContext(TokenContext);
  const navigator = useNavigate(); // Inicializamos el hook useNavigate

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Datos del formulario:", JSON.stringify(data));
    try {
      const status = await validateUser(data); // Retorna el status de la respuesta
      if (status == "200") {
        const token = await getToken(data);
        localStorage.setItem("token", token);
        setNewToken(token); // Guarda el token en localStorage

        navigator("/"); // Redirige a la página principal
      } else {
        setError("password", invalidUserOrPasswordError);
      }
    } catch (error) {
      setError("password", invalidUserOrPasswordError);
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {<h1 className=" text-danger">{expiredMsg}</h1>}
      <h2 className="p-2 mb-4">Iniciar Sesión</h2>
      {/*handleSubmit pasa los datos a la función callback para que los maneje*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column align-items-center">
          <label htmlFor="username" className="form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            {...register("username")}
            className="form-control w-100"
          />
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password", {})}
            className="form-control w-100"
          />
          {/* Aquí se muestra el mensaje de error si existe */}
          {errors.password && (
            <p className=" text-danger">{errors.password.message}</p>
          )}
          <button type="submit" className="btn btn-primary mt-3">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
