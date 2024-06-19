import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Contexts/DataContext";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import "./UserProfile.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { useAuthContext } from "../../Contexts/AuthContext";
import { PostCard } from "../../Components/PostCard/PostCard";
import { EditProfileModal } from "../../Components/EditProfileModal";

export const UserProfile = () => {
  const { state, isFollowing, unfollow, followUser } = useContext(DataContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const { username } = useParams();
  const { loginDetails } = useAuthContext();

  const user = state?.users.find((user) => user.username === username);

  const editProfile = () => {
    setShowEditModal(true);
  };

  const userPosts = state?.posts?.filter((post) => post.username === username);

  return (
    <div className="container">
      <div className="right-column">
        <Navbar />
      </div>
      <div className="middle-column">
        {!user ? (
          <div>
            <h2>User not found, please logout and login again.</h2>
          </div>
        ) : (
          <div className="single-user-profile">
            {user && (
              <div className="user-details">
                <img
                  src={
                    user.backgroundImage ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k0T21CfIFSTgz_2QXAHhYp4xFjTXoiXK4A&s"
                  }
                  alt="user background"
                  className="background-image"
                />
                <div className="relative">
                  {" "}
                  <img
                    className="avatar"
                    src={
                      user?.profileAvatar ||
                      "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
                    }
                    alt={username}
                  />
                </div>
                <div className="user">
                  <div className="user-details">
                    <h2 className="full-name" style={{ marginTop: "55px" }}>
                      {user.firstName} {user.lastName}{" "}
                    </h2>
                    <p className="username">@{username}</p>
                    <p className="bio">{user.bio}</p>
                    <a href={user.website} target="_blank" rel="noreferrer">
                      <p className="website">{user.website}</p>
                    </a>
                  </div>
                  {loginDetails?.foundUser.username === username ? (
                    <button
                      className="edit-profile-button"
                      onClick={editProfile}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="follow-button-container">
                      {isFollowing(user._id) ? (
                        <button
                          className="follow-button"
                          onClick={() => unfollow(user._id)}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="follow-button"
                          onClick={() => followUser(user._id)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <hr />
              </div>
            )}
            <div>
              {showEditModal && (
                <EditProfileModal user={user} showModal={setShowEditModal} />
              )}
            </div>
          </div>
        )}
        <div className="home-container">
          {userPosts.length === 0 ? (
            <h2>Create posts on the homepage to see them here.</h2>
          ) : (
            <ul>
              {userPosts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="right-column">
        <SuggestedUsers />
      </div>
    </div>
  );
};
