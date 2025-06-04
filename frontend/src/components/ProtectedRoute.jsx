import React, { useContext, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useLogin";
import Layout from "../layout/layout";
import { useEffect } from "react";
import TokenContext from "../context/AuthContext";

function ProtectedRoute({children}){
     const {isAuthenticated} = useContext(TokenContext);
    
   
    
    
  
    
   
   
    
    
    return  isAuthenticated ? children : <Navigate to="/login"  />;
}

export default ProtectedRoute;