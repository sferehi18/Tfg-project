import React, { createContext, useState } from 'react';
import { useUsers } from '../hooks/UseResources';
const UserContext = createContext();

export function UserProvider({ children }) {
  

  const [user, setUser] = useState(localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null);

 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;