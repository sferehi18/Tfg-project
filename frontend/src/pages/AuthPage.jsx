import React, { useState } from "react";
import { useContext } from "react";
import { get, set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../hooks/useLogin"; // Importamos el hook useAuth
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import TokenContext from "../context/AuthContext";
import { useFormValidations } from "../hooks/useValidations";
import ToggleButton from "../components/ToogleButton";
import LoginForm from "./loginForm";
import RegisterForm from "./RegisterForm";
function AuthPage() {
  const [form,setForm] = useState(true);
 // Importamos el hook useAuth para obtener el token

  const {
  
    expiredMsg,
  } = useContext(TokenContext);


  
 

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {form && <h1 className=" alert alert-danger ">{expiredMsg}</h1>}
      <h2 className="p-2 mb-4">{form ? "Iniciar Sesión" : "Registrarse"}</h2>
      {/*handleSubmit pasa los datos a la función callback para que los maneje*/}
            {form ?  <LoginForm></LoginForm> : <RegisterForm></RegisterForm>}
      <ToggleButton enabledText={"Sign up"} disabledText={"Login"} customAction={setForm} customState={form}></ToggleButton>
    </div>
  );
}

export default AuthPage;
