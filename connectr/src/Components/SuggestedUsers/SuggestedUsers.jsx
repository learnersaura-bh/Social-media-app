import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import "./SuggestedUsers.css"
import { useNavigate } from "react-router-dom";
export const SuggestedUsers = () => {
    const {state , isFollowing , unfollow , followUser } = useContext(DataContext)
    const navigate = useNavigate()
    const loggedUser = localStorage?.getItem("user");

const user = JSON?.parse(loggedUser);
    return (
      <div className="suggested-users">
        <h2 className="suggested-users-heading">Suggested Users</h2>
        {state?.users?.filter((User) => User.username !== user?.username).map(({ fullName, profileAvatar, username, _id }) => (
          <div key={_id} className="user-card">
            <img className="user-avatar" src={profileAvatar} alt={fullName} onClick={() => navigate(`/profile/${username}`)}/>
            <div className="user-details">
              <p className="user-name">{fullName}</p>
              <p className="user-username">@{username}</p>
            </div>
            {/* <button className="follow-button">Follow</button> */}
            {isFollowing(_id) ? (
                <button className="follow-button" onClick={() => unfollow(_id)}>Unfollow</button>
              ) : (
                <button className="follow-button" onClick={() => followUser(_id)}>Follow</button>
              )}
          </div>
        ))}
      </div>
    );
  };
  