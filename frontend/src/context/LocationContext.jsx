import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LocationStateContext = createContext();

export function LocationStateProvider ({children}){
    
    const [locationstate,setLocationState] = useState({});



    return( <LocationStateContext.Provider value={{locationstate,setLocationState}}>
        {children}
    </LocationStateContext.Provider> )
}
export default LocationStateContext;