import react from 'react';
import { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext'; // Importar el contexto del encabezado
import ToogleButton from '../components/ToogleButton'; // Importar el componente de botón de alternancia
function UserSettings() {
  const { setTitle, setPageType } = useContext(HeaderContext); // Importar el contexto del encabezado
   useEffect(()=>{
    setTitle("Configuración de Usuario");
  setPageType(null);
   },[])
   
  return (
    <div className=" h-100">
      
    
       <form className='container  mt-5 '>
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
        <label htmlFor="email" className='form-label'>Modo Oscuro</label>
        <ToogleButton className='form-check-input' id="darkModeToggle" />
        </div>

       </form>
    </div>
  );
}

export default UserSettings;