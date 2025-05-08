import react from 'react';

function UserSettings() {
  return (
    <div className="contentContainer bg-white overflow-auto rounded-4 p-2">
      <h2 className="p-2 mb-4">Configuración de Usuario</h2>
    
       <form>
        <div className='d-flex flex-column align-items-center'>
        <label htmlFor="username" className=' form-label'>Nombre de Usuario</label>
       
        <input type="text" name="username" id="" className='form-control w-50' />
        <label htmlFor="password" className='form-label'>Contraseña</label>
        <input type="text" name="password" id="" className='form-control w-50' />
        </div>
      
       </form>
    </div>
  );
}

export default UserSettings;