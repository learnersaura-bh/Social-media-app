import React, { useState } from "react";
import "./EditProfileModal.css"
export const EditProfileModal = ({ user, onSave, onClose }) => {
    const [fullName, setFullName] = useState(user?.fullName);
    const [bio, setBio] = useState(user?.bio);
    const [website, setWebsite] = useState(user?.website);
    const [profileAvatar, setProfileAvatar] = useState(user?.profileAvatar);
  
    const handleSave = () => {
      const updatedUser = {
        ...user,
        fullName,
        bio,
        website,
        profileAvatar,
      };
  
      onSave(updatedUser);
    };
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setProfileAvatar(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="edit-profile-modal">
        <div className="edit-profile-modal-content">
          <h2>Edit Profile</h2>
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profileAvatar">Profile Image</label>
                <input
                  type="file"
                  id="profileAvatar"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    