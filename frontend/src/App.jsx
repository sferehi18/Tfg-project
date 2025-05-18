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
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import TokenContext, { TokenProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {

  
  

  
  
  return (
    <TokenProvider>
     <CreationProvider>
       <QueryClientProvider client={queryClient}>
       <Router>

       
      <Routes >
         <Route path="/login" element={<AuthLayout/>} >
          <Route index  element={<LoginPage/>} />
        </Route>
    
        <Route path="/" element={<ProtectedRoute ><Layout></Layout> </ProtectedRoute> }>
        
          <Route index element={<Subjects />} /> 
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="" element={<Subjects />} />
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
   </TokenProvider>
    
    
  );
}

export default App;
