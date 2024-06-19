import React, { useContext, useState } from "react";
import "./EditProfileModal.css";
import { DataContext } from "../Contexts/DataContext";
import { editUserProfile } from "../actions/actions";
import { useAuthContext } from "../Contexts/AuthContext";

export const EditProfileModal = ({ user, setUser, showModal }) => {
  const [input, setInput] = useState({ ...user });
  const { loginDetails } = useAuthContext();
  const [showAvatarList, setShowAvatarList] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.profileAvatar);
  const { dispatch } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editUserData = { ...input, profileAvatar: selectedAvatar };

    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        body: JSON.stringify({ userData: editUserData }),
        headers: {
          authorization: loginDetails?.encodedToken,
          "Content-Type": "application/json",
        },
      });

      const { user: updatedUser } = await response.json();
      setTimeout(() => {
        dispatch(editUserProfile(updatedUser));
        showModal(false);
      }, 200);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarSelect = (selectedAvatar) => {
    setSelectedAvatar(selectedAvatar);
    setShowAvatarList(false);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const avatarList = [
    "https://i.imgur.com/U2sRwye.png",
    "https://i.imgur.com/lxX3wS8.png",
    "https://i.imgur.com/qG8GgGc.png",
    "https://i.imgur.com/czLVmAz.png",
    "https://i.imgur.com/e3e623F.png",
    "https://i.imgur.com/QAx0BgG.png",
    "https://i.imgur.com/6OQTZFA.png",
  ];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="close-button"
            onClick={() => showModal(false)}
          >
            &times;
          </button>
          <img
            src={
              selectedAvatar ||
              "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
            }
            alt={user?.username}
            onClick={() => setShowAvatarList((prev) => !prev)}
            className="edit-user-avatar"
          />
          {showAvatarList && (
            <div className="avatar-list">
              {avatarList.map((imgUrl) => (
                <span key={imgUrl}>
                  <img
                    className="list-avatar"
                    src={imgUrl}
                    alt={imgUrl}
                    onClick={() => handleAvatarSelect(imgUrl)}
                    height="50px"
                  />
                </span>
              ))}
            </div>
          )}
          <label>
            First Name:
            <input
              type="text"
              className="modal-input"
              placeholder="Edit First Name"
              value={input.firstName}
              name="firstName"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              className="modal-input"
              placeholder="Edit Last Name"
              value={input.lastName}
              name="lastName"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Bio:
            <input
              type="text"
              className="modal-input"
              placeholder="Edit Bio"
              value={input.bio}
              name="bio"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Website:
            <input
              type="text"
              className="modal-input"
              placeholder="Edit Website"
              value={input.website}
              name="website"
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
