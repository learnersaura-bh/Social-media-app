import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext);
  const { logoutHandler, loginDetails } = useAuthContext();

  const logout = () => {
    logoutHandler();
    navigate("/login");
  };

  const loggedUser = state?.users?.find(
    (user) => user._id === loginDetails?.foundUser._id
  );

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <li
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "#1399ed ",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          {" "}
          <img
            style={{ width: "85px" }}
            src="https://cdn0.iconfinder.com/data/icons/social-media-2127/48/social_media_social_media_logo_mixcloud-512.png"
            alt=""
          />{" "}
          <span>connectr</span>
        </li>
        <li className="sidebar-item" onClick={() => navigate("/")}>
          <AiIcons.AiOutlineHome title="home" />
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
        <li
          className="sidebar-item"
          onClick={() => navigate(`/profile/${loggedUser?.username}`)}
        >
          <AiIcons.AiOutlineUser />
          <span className="sidebar-item-text">Profile</span>
        </li>
        <li className="sidebar-item" onClick={logout}>
          <MdIcons.MdOutlineLogout />
          <span className="sidebar-item-text">Logout</span>
        </li>
      </nav>
      {loginDetails?.foundUser && (
        <div
          className="logged-user cursor-pointer"
          onClick={() => navigate(`/profile/${loggedUser?.username}`)}
        >
          <img
            src={
              loggedUser?.profileAvatar ||
              loginDetails?.foundUser.profileAvatar ||
              "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
            }
            alt="User Avatar"
          />
          <div className="user-info">
            <p className="user-name">
              {loggedUser?.firstName || loginDetails?.foundUser.firstName}{" "}
              {loggedUser?.lastName || loginDetails?.foundUser.lastName}
            </p>
            <p className="user-username">
              @{loggedUser?.username || loginDetails?.foundUser.username}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
