import React, { useContext } from "react";
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
import AuthLayout from "./layout/AuthLayout";
import AuthPage from "./pages/AuthPage";
import { useState } from "react";
import TokenContext, { TokenProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./pages/RegisterForm";
import ToastContext from "./context/ToastContext";
import { HeaderProvider } from "./context/HeaderContext";
import { ToastProvider } from "./context/ToastContext"; // asegúrate que el nombre del archivo esté bien: "ToastContext.jsx"
import { ThemeProvider } from "./context/UseTheme";
import UserContext, {UserProvider} from "./context/UserContext"; // Asegúrate de que el nombre del archivo sea correcto
import { Navigate } from "react-router-dom";
const queryClient = new QueryClient();

function App() {


  
  
  return (
    <UserProvider>
      <ThemeProvider>
      <HeaderProvider>
       <ToastProvider>
      <TokenProvider>
     <CreationProvider>
       <QueryClientProvider client={queryClient}>
       <Router>

       
      <Routes >
        <Route path="/" element={<Navigate to="/login" replace />} />

         <Route path="/login" element={<AuthLayout/>} >
          <Route index element={<AuthPage/>} />
        </Route>
    
        <Route element={<ProtectedRoute ><Layout></Layout> </ProtectedRoute> }>
        
          <Route index path="subjects" element={<Subjects />} /> 
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/subjects/:subjectUri/topics" element={<Topics />} />
          <Route path="subjects/:subjectUri/topics/:topicUri/files" element={<Files />} />  
          <Route path="storage" element={<Storage></Storage>}></Route>

          <Route path="userSettings" element={<UserSettings />} />
          <Route path="marked" element={<Favourites />} />
        </Route>
      </Routes>
    </Router>
    </QueryClientProvider>
     
     </CreationProvider>
   </TokenProvider>
    
    </ToastProvider>
    </HeaderProvider>
    </ThemeProvider>
    </UserProvider>
    
    
   
    
    
  );
}

export default App;
