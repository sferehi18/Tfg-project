import { useContext, useRef } from "react";
import TokenContext from "../context/AuthContext";
import { useUsers } from "../hooks/UseResources";
import defaultpfp from "../assets/defaultpfp.png"; 
import UserContext from "../context/UserContext";
function PfpContainer({ className }) {
  const { avatar,setAvatar } = useContext(TokenContext);
  const {user} = useContext(UserContext);
  const { uploadpfp } = useUsers();


  const inputRef = useRef(null);

  // Cuando cambie el input file, sube la imagen
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
       
       uploadpfp(file).then(imgUrl => setAvatar(imgUrl));
      
     
      
    } catch (error) {
      console.error("Error al subir avatar:", error);
    }
  };

  // Para abrir el selector de archivo al hacer clic en el div
  const handleDivClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div
        onClick={handleDivClick}
        className={`d-flex  align-items-center mb-2  cursor-pointer ${className} rounded-4 `}
        style={{width:"fit-content"}}
      >
        {
          <img src={avatar || defaultpfp} alt="Perfil" className="rounded-5 " style={{width:"70px", height:"70px"}}  />
          
    }
    <p className="p-2">{`@${user.name}${user.id}`}</p>
      </div>
    </>
  );
}

export default PfpContainer;
