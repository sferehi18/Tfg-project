import { createContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [show, setShow] = useState(false);
    const [variant,setVariant] = useState({});
    
    const handleShow = (variant) =>{
        setVariant(variant)
            setShow(true)
            
            setTimeout(() => {
                setShow(false)
            }, 3000);
    }
  return (
    <ToastContext.Provider value={{ show, setShow,variant,setVariant,handleShow }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastContext;
