import react from 'react';

function UserSettings() {
  return (
    <div className="contentContainer bg-white overflow-auto rounded-4">
      <h2 className="p-2">Configuración de Usuario</h2>
      <p>Esta es la página de configuración de usuario.</p>
       <form>
        <label htmlFor="username" className=' form-label'>Nombre de Usuario</label>
        <label htmlFor="password" className='form-label'>Contraseña</label>
        <input type="text" name="username" id="" className='form-control' />
        <input type="text" name="password" id="" className='form-control' />
       </form>
    </div>
  );
}

export default UserSettings;