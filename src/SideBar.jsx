import ImageFiles from "./ImageFile";
import Navbar from "./NavBar";
function SideBar(){
    return(
        <div className="side-bar">
            <Navbar size={"small"}></Navbar>
       <ImageFiles number={1}></ImageFiles>
       <ImageFiles number={2}></ImageFiles>
       <ImageFiles number={3}></ImageFiles>
       <ImageFiles number={4}></ImageFiles>

        </div>
    )
}


export default SideBar;
