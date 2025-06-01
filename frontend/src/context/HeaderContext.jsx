import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HeaderContext = createContext();

export function HeaderProvider ({children}){
    
    const [title,setTitle] = useState("title");
    
    const [pageType,setPageType] = useState("subject");

    

    return( <HeaderContext.Provider value={{title,setTitle,pageType,setPageType}}>
        {children}
    </HeaderContext.Provider> )
}
export default HeaderContext;