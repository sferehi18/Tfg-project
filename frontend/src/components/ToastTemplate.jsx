import { Toast, ToastContainer } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"

function ToastTemplate({headerText,bodyText,show,color}){
const icon = color == "success" ?  
 <FaCheck size={"20px"} color="white"></FaCheck> : <FaTimes size={"20px"} color="white"></FaTimes> 

    return (
        <ToastContainer  position="top-end" style={{zIndex:"2000"}}>
              <Toast bg={color} show={show}   >
            <Toast.Header className="d-flex flex-nowrap gap-2" closeButton={false}>
                <span className={`bg-${color} d-flex justify-content-start rounded-3 p-1`}>
                    {icon}
                    </span> 
                 {headerText}</Toast.Header>
            <Toast.Body >{bodyText}</Toast.Body>
        </Toast>
        </ToastContainer>
      
    )

}

export default ToastTemplate