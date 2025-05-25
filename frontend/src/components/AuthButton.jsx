import React from "react";

function AuthButton({text,setform}){

    return (
    <button className="auth-button d-flex  p-1 align-items-center justify-content-center rounded-5 w-25 fs-2">{text}</button>


    );
}


export default AuthButton;