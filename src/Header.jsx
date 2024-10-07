import react from "react";
import Profile from './Profile.jsx'
import NotifyIcon from "./NotifyIcon.jsx";
import Navbar from "./NavBar.jsx";

function Header(){
return(
    <header className="navigation-menu">
        <div className="header-left-container">
            <Profile/>
            <NotifyIcon/>

        </div>
        <div className="header-middle-comntainer"></div>
        <Navbar size={"large"}/>
        
    </header>

);

}





export default Header;