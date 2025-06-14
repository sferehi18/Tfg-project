import React from "react";
import { useContext } from "react";
import { get, set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../hooks/useLogin"; // Importamos el hook useAuth
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import TokenContext from "../context/AuthContext";
import { useFormValidations } from "../hooks/useValidations";
function RegisterForm(){
    const {emailValidations,passwordValidations} = useFormValidations();
    const { getToken, validateUser, invalidUserOrPasswordError, createUser } = useAuth(); // Importamos el hook useAuth para obtener el token
  const {
    token,
    setNewToken,
    isTokenValid,
    isTokenExpired,
    isTokenPresent,
    expiredMsg,
  } = useContext(TokenContext);
  const navigator = useNavigate(); // Inicializamos el hook useNavigate
  let ok = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = async (data) =>{
    const trimmedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim()]));
    const response = await createUser(data);
    if(response.status == "200"){
      ok = true;
      console.log(response.status);
    }else{
      ok = false;
      console.log(response.data.title);
      setError(response?.data?.title, {
        type: "manual",
        message:response?.data?.detail || "Error al crear el usuario",
        
      });
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
            {...register("username",{ required: "Porfavor inserta un usuario valido"
            })
              
            }
            className="form-control text-body bg-body w-100"
          />
          {errors.username && ( <p className=" text-danger">{errors.username.message}</p>)}
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>

        <input type="hidden" value="true" {...register("enabled")} />

          <input
            type="password"
            {...register("password", passwordValidations)}
            className="form-control w-100"
          />
          {errors.password && (
            <p className=" text-danger">{errors.password.message}</p>
          )}

          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input className="form-control" type="text" {...register("email",emailValidations)
           
          }  />
           {errors.email && (
            <p className=" text-danger">{errors.email.message}</p>
          )}
          {/* Aquí se muestra el mensaje de error si existe */}
          
          {ok && <p className="text-succes">Usuario registrado correctamente</p>}
          
          <button type="submit" className="btn-auth bg-primar text-white mt-3">
            Registrarse
          </button>
        </div>
      </form>

  );
}

export default RegisterForm;