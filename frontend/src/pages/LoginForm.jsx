import { useFormValidations } from "../hooks/useValidations";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useLogin";
import { useContext } from "react";
import TokenContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function LoginForm(){
      const {
    setNewToken,
    expiredMsg,
  } = useContext(TokenContext);
  const navigate = useNavigate();

  
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm();
    const {usernameValidations,passwordValidations} = useFormValidations();
     const { getToken, validateUser, invalidUserOrPasswordError } = useAuth(); 
     const onSubmit = async (data) => {
    console.log("Datos del formulario:", JSON.stringify(data));
    try {
      const status = await validateUser(data); // Retorna el status de la respuesta
      if (status == "200") {
        const token = await getToken(data);
        localStorage.setItem("token", token);
        setNewToken(token); // Guarda el token en localStorage

        navigate("/"); // Redirige a la página principal
      } else {
        setError("password", invalidUserOrPasswordError);
      }
    } catch (error) {
      setError("password", invalidUserOrPasswordError);
      console.error("Error en login:", error);
    }
  };
    return (
      
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column align-items-center">
          <label htmlFor="username" className="form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            {...register("username",usernameValidations)}
            className="form-control w-100"
          />
          {errors.username && ( <p className="text-danger">{errors.username.message}</p>)}
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password", passwordValidations)}
            className="form-control w-100"
          />
          {/* Aquí se muestra el mensaje de error si existe */}
          {errors.password && (
            <p className=" text-danger">{errors.password.message}</p>
          )}
          
          <button type="submit" className="btn bg-primar text-white mt-3">
            Iniciar Sesión
          </button>
        </div>
      </form>
    );
}
export default LoginForm;