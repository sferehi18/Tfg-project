import react from 'react';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import { useSubjects } from "../hooks/UseResources";
import { Outlet } from 'react-router-dom';

function AuthLayout(){
    return(
        <div className=' d-flex justify-content-end'>
            <Outlet/>
        </div>
    )
}
export default AuthLayout;