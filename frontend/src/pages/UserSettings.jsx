import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';
import ToogleButton from '../components/ToogleButton';
import ThemeContext from '../context/UseTheme';

function UserSettings() {
  const { setTitle, setPageType } = useContext(HeaderContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTitle("Configuración de Usuario");
    setPageType(null);
  }, []);

  return (
    <div className="h-100">
      <form className='container mt-5'>
         <div className='row ms-5'>
        <label htmlFor="username"  className=' form-label'>Nombre de Usuario</label>
          <input type="text" name="username" className='form-control w-50' />
       </div>

        <div className='row mt-2 ms-5'>
        <label htmlFor="password" className='form-label'>Contraseña</label>
        <input type="text" name="password"  className='form-control w-50' />
        </div>

        <div className='row mt-2 ms-5'>
        <label htmlFor="email" className='form-label'>Correo Electrónico</label>
        <input type="email" name="email" className='form-control w-50' />
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
