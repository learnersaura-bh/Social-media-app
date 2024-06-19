import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import "./SuggestedUsers.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
export const SuggestedUsers = () => {
  const { state, isFollowing, unfollow, followUser } = useContext(DataContext);
  const { loginDetails } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="suggested-users">
      <h2 className="suggested-users-heading">Suggested Users</h2>
      {state?.users
        ?.filter(
          (user) =>
            !isFollowing(user._id) &&
            user.username !== loginDetails?.foundUser?.username
        )
        .map(({ firstName, lastName, profileAvatar, username, _id }) => (
          <div key={_id} className="user-card">
            <div
              className="user-information"
              onClick={() => navigate(`/profile/${username}`)}
            >
              <img
                className="user-avatar"
                src={profileAvatar}
                alt={firstName}
                onClick={() => navigate(`/profile/${username}`)}
              />
              <div className="suggested-user-details">
                <p className="user-name">{firstName}</p>
                <p className="user-username">@{username}</p>
              </div>
            </div>
            {isFollowing(_id) ? (
              <button className="follow-button" onClick={() => unfollow(_id)}>
                Unfollow
              </button>
            ) : (
              <button className="follow-button" onClick={() => followUser(_id)}>
                Follow
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
