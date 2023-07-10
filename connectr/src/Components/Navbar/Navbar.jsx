import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

import { useNavigate } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
    const navigate = useNavigate()
    const loggedUser = localStorage?.getItem("user");
const {username : loggedUsername  , fullName} = JSON?.parse(loggedUser);
const logoutHandler = () =>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login")
}
  return (
    <>
    
     
    <div className="sidebar">
      <nav className="sidebar-nav">
        <li className="sidebar-item" onClick={() => navigate("/")}>
          <AiIcons.AiOutlineHome title="home"/>
          <span className="sidebar-item-text">Home</span>
        </li>
        <li className="sidebar-item" onClick={() => navigate("/explore")}>
          <AiIcons.AiOutlineRocket />
          <span className="sidebar-item-text">Explore</span>
        </li>
        <li className="sidebar-item" onClick={() => navigate("/bookmarks")}>
          <FaIcons.FaRegBookmark />
          <span className="sidebar-item-text">Bookmark</span>
        </li>
        <li className="sidebar-item" onClick={() => navigate(`/profile/${loggedUsername }`)}>
          <AiIcons.AiOutlineUser />
          <span className="sidebar-item-text">Profile</span>
        </li>
        <li className="sidebar-item" onClick={logoutHandler}>
          <MdIcons.MdOutlineLogout />
          <span className="sidebar-item-text">Logout</span>
        </li>
      </nav>
      <div className="user-info cursor-pointer" onClick={() => navigate(`/profile/${loggedUsername }`)}>
        
        <p className="user-name">{fullName}</p>
        <p className="user-username">@{loggedUsername }</p>
      </div>
    </div>
    </>
  );
};