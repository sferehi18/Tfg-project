import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import MyCalendar from "./pages/Calendar"; 
import Subjects from "./pages/Subjects";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'; 
import Topics from "./pages/Topics";
import Filetable from "./pages/FileTable";
import Storage from "./pages/Storage";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { CreationProvider } from "./context/ModalsMenusContext";
import Files from "./pages/Files";
import Favourites from "./pages/Favourites";
import UserSettings from "./pages/UserSettings";
import { use } from "react";
import { useAuth } from "./hooks/useLogin";
import { useEffect } from "react";
const queryClient = new QueryClient();

function App() {

  const { getToken } = useAuth();

  useEffect(() => {
    getToken()
      .then((token) => {
        // Verificamos si el token es una cadena de texto y luego lo guardamos
        if (typeof token === "string") {
          localStorage.setItem("token", token); // Guardamos el token en el localStorage
          console.log("Token almacenado:", token); // Puedes ver el token aquí en la consola
        } else {
          console.error("El token no es válido:", token);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error); // Manejamos el error si la solicitud falla
      });
  }, []); // Dependiendo de getToken, solo se ejecutará una vez

  
  return (
    
     <CreationProvider>
       <QueryClientProvider client={queryClient}>
       <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Subjects />} /> 
          <Route path="calendar" element={<MyCalendar />} />
          <Route path="login" element={<Subjects />} />
          <Route path="subject/:subjectId/topics/" element={<Topics />} />
          <Route path="subject/:subjectId/topics/:topicId/files" element={<Files />} />  
          <Route path="storage" element = {<Storage/>}/>
          <Route path="userSettings" element={<UserSettings />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </Router>
    </QueryClientProvider>
     
     </CreationProvider>
   
    
    
  );
}

export default App;
