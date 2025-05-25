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
import AuthButton from "../components/AuthButton";

function AuthPage() {
  const [form,setForm] = useState(true);
 // Importamos el hook useAuth para obtener el token
  
  const {
  
    expiredMsg,
  } = useContext(TokenContext);

  const alert =  expiredMsg != '' ? "alert alert-danger" : '';
  
 

  return (
    <div className="d-flex flex-row align-items-center justify-content-beetween vh-100 w-100  bg-white">
      <div className="w-50  h-100 bg-primary-gradient rounded-4 d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-white login-text">!Bienvenido!</h1>
      <h2 className="text-white login-text">Comienza tu experiencia</h2>
      <h3 className="text-white login-text">Gestiona tus asignaturas, temas, archivos y eventos </h3>
      <ToggleButton enabledText={"Login"} disabledText={"Sign up"} customAction={setForm} customState={form} ></ToggleButton>
     
      </div>

      <div className={` d-flex flex-column align-items-center justify-content-center h-100 w-50`}>
      
      {form && <h1 className={alert}>{expiredMsg}</h1>}
      <h2 className="p-2 mb-4">{form ? "Iniciar Sesión" : "Registrarse"}</h2>
      {/*handleSubmit pasa los datos a la función callback para que los maneje*/}
            {form ?  <LoginForm></LoginForm> : <RegisterForm></RegisterForm>}
      
    </div>
    </div>
    
  );
}

export default AuthPage;
