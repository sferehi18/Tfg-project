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
import { motion } from "framer-motion";
function AuthPage() {
  const [form, setForm] = useState(true);
  // Importamos el hook useAuth para obtener el token
  const handleformChange = () => {
    setForm(!form);
  };
  const { expiredMsg } = useContext(TokenContext);

  const alert = expiredMsg != "" ? "alert alert-danger" : "";

  return (
    <div className=" d-flex bg-body flex-row align-items-center  vh-100 w-100  bg-white">
      <div className="  w-50 h-100 bg-primary-gradient rounded-4 d-flex flex-column align-items-center justify-content-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-body  mb-2 p-1"
          >
            !Bienvenido!
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-body  mb-2 p-1 "
          >
            Comienza tu experiencia
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          className="text-body  p-1">
            Gestiona tus asignaturas, temas, archivos y eventos
          </motion.h3>
        </div>
      </div>

      <div
        className={`d-flex  w-50  flex-column align-items-center justify-content-center h-100 `}
      >
        {form && <h1 className={alert + "text-sm"}>{expiredMsg}</h1>}
        <div>
          <h2 className=" mb-4 ">{form ? "Iniciar Sesión" : "Registrarse"}</h2>
        </div>
        {/*handleSubmit pasa los datos a la función callback para que los maneje*/}
        {form ? <LoginForm></LoginForm> : <RegisterForm></RegisterForm>}
        <ToggleButton
          enabledText={"Login"}
          disabledText={"Sign up"}
          setState={() => setForm((prev) => !prev)}
          state={form}
        ></ToggleButton>
      </div>
    </div>
  );
}

export default AuthPage;
