import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../hooks/useLogin"; // Importamos el hook useAuth
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
function LoginPage() {
  const { getToken } = useAuth(); // Importamos el hook useAuth para obtener el token
  const navigator = useNavigate(); // Inicializamos el hook useNavigate

  const { register, handleSubmit,
    formState: { errors }} = useForm();
  const onSubmit = (data) => {
    getToken(data) // Llamamos a la función getToken con los datos del formulario
      .then((token) => {
        // Verificamos si el token es una cadena de texto y luego lo guardamos
        if (typeof token === "string") {
          localStorage.setItem("token", token);

          console.log("Token almacenado:", token); // Puedes ver el token aquí en la consola
        } else {
          console.error("El token no es válido:", token);
        }
        navigator("/"); // Redirigimos al usuario a la página principal
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error); // Manejamos el error si la solicitud falla
      });
    console.log(data);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="p-2 mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column align-items-center">
          <label htmlFor="username" className="form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            {...register("username")}
            className="form-control w-50"
          />
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password",{
          required: "La contraseña es obligatoria",
          minLength: {
            value: 3,
            message: "Debe tener al menos 3 caracteres",
          },
        })}
            
            className="form-control w-50"
          />
          {errors.password && <p className=" text-danger">{errors.password.message}</p>}
          <button type="submit" className="btn btn-primary mt-3">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
