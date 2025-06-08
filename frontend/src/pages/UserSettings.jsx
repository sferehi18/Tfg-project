import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';
import ToogleButton from '../components/ToogleButton';
import ThemeContext from '../context/UseTheme';
import UserContext from '../context/UserContext';
import PfpContainer from '../components/PfpContainer';

function UserSettings() {
  const { setTitle, setPageType } = useContext(HeaderContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const {user , setUser} = useContext(UserContext); // Puedes usar el contexto de usuario si es necesario
  
  console.log("userDetails", user);
  useEffect(() => {
    setTitle("Configuración de Usuario");
    setPageType(null);
   
  }, []);

  return (
    <div className="h-100">
      <form className='container mt-5'>
        <div className='row ms-5'>
          <PfpContainer></PfpContainer>
          </div>
         <div className='row ms-5'>
        <label htmlFor="username"  className=' form-label'>Nombre de Usuario</label>
          <input readOnly type="text" name="username" value={user.name} className='form-control w-50' />
       </div>

    
        <div className='row mt-2 ms-5'>
        <label htmlFor="email" className='form-label'>Correo Electrónico</label>
        <input readOnly type="email" name="email" value={user.email}  className='form-control w-50' />
        </div>
        
        <div className='row mt-2 ms-5'>
          <label htmlFor="darkModeToggle" className='form-label'>Modo Oscuro</label>
          <ToogleButton id="darkModeToggle" state={darkMode} setState={toggleTheme} />
        </div>
      </form>
    </div>
  );
}

export default UserSettings;
