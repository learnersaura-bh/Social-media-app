import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../Contexts/DataContext"
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers"
import { FaBookmark, FaRegBookmark ,FaRegHeart, FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import { Navbar } from "../../Components/Navbar/Navbar";

export const UserProfile = () =>{
    const {state , dispatch, getData , isFollowing , unfollow , followUser , addToBookmarks , removeFromBookmarks , likeHandler , dislikeHandler , saveEditPost , editPostId, setEditPostId , editContentInput , setEditContentInput , postDeleteHandler, bookmarkIds  } = useContext(DataContext)
    const [showEditModal , setShowEditModal] = useState(false)
    const {username} = useParams()
 
    
    const loggedUser = state?.users.find(user => user.username === username) 
    const user = {...loggedUser}
    const loggedInUser = localStorage.getItem("user")
    const parsedUser = JSON.parse(loggedInUser)
    
const [img , setImg] = useState(user?.profileAvatar)
    const [userE, setUserE] = useState({ ...user });
    const [showAvatarList, setShowAvatarList] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(user?.profileAvatar);
  const [input, setInput] = useState(loggedUser);
 
  useEffect(() => {
    setImg(user?.profileAvatar);
    setSelectedAvatar(user?.profileAvatar)
  }, [user?.profileAvatar]);
  // console.log("abcdefef abcdefghijklmnopqrstuvwxyza" , user);

  const handleAvatarSelect = (selectedAvatar) => {
    setSelectedAvatar(selectedAvatar);
    setShowAvatarList(false);
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setUserE({ ...input });
  const updatedUser = { ...input, profileAvatar: selectedAvatar };

  try {
    const response = await fetch('/api/users/edit', {
      method: 'POST',
      body: JSON.stringify({ userData: updatedUser }),
      headers: {
        authorization : localStorage.getItem("token")
      },
    });
    // console.log(await response.json()  "data after edit user adarsh balika");
    const {user} = await response.json()
        console.log(user ,  "data after edit user adarsh balika");
        dispatch({ type: "Update_User", payload: user });
        getData()
        console.log(state , "state after edit");
      // const data = await response.json();
      // setUserE(data.user);
      setShowEditModal(false);
    
  } catch (error) {
    console.error(error);
  }
    setShowEditModal(false);
  };
      const avatarList = [
        "https://i.imgur.com/U2sRwye.png",
        "https://i.imgur.com/lxX3wS8.png",
        "https://i.imgur.com/qG8GgGc.png",
        "https://i.imgur.com/czLVmAz.png",
        "https://i.imgur.com/e3e623F.png",
        "https://i.imgur.com/QAx0BgG.png",
        "https://i.imgur.com/6OQTZFA.png"
      ];
const editProfile = () =>{
    setInput({ ...loggedUser }); // Set input state with pre-existing values
  setShowEditModal(true);
}

    return(
      <div className="container">
  <Navbar />

  <div className="middle-column" >
<div className="single-user-profile">
      <h1 className="profile-heading">Hello</h1>
      {user && (
        <div className="user-details">
          <img className="avatar" src={selectedAvatar} alt={username} height="30px" />
          <h2 className="full-name">{user.fullName}</h2>
          <p className="username">@{username}</p>
          <p className="bio">{user.bio}</p>
          <p className="website">{user.website}</p>
          {parsedUser.username === username ? (
            <button className="edit-profile-button" onClick={editProfile}>
              Edit Profile
            </button>
          ) : (
            <div className="follow-button-container">
              {isFollowing(user._id) ? (
                <button className="follow-button" onClick={() => unfollow(user._id)}>
                  Unfollow
                </button>
              ) : (
                <button className="follow-button" onClick={() => followUser(user._id)}>
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
     
      
      <div>
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal">
              <form onSubmit={handleSubmit}>
                <button className="close-button" onClick={() => setShowEditModal(false)}>
                  &times;
                </button>
                <img
                  src={selectedAvatar}
                  alt={user?.username}
                  onClick={() => setShowAvatarList(true)}
                  height="120px"
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
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Edit Name"
                  value={input.fullName}
                  name="fullName"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Edit bio"
                  value={input.bio}
                  name="bio"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Edit Website"
                  value={input.website}
                  name="website"
                  onChange={handleChange}
                />
                <button type="submit" className="save-button">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="home-container">
      <div className="home-container">
      
      {state?.posts
          ?.filter((post) => post.username === username)?.map(
        ({
          _id,
          content,
          likes: { likeCount, likedBy },
          createdAt,
          username,
          image,
          fullName,
        }) => (
          <li key={_id} className="post-item">
            <div className="user-info" >
              <img className="profile-pic" src={state?.users?.find((user) => user.username === username)?.profileAvatar} alt="Profile pic" />
              <div className="user-details">
                <p className="user-name">{fullName}</p>
                <p className="post-username">@{username}</p>
                <p className="post-time">{createdAt}</p>
              </div>
            </div>
            {image && (
              <div className="post-image-container">
                <img className="post-image" src={image} alt={username} />
              </div>
            )}
            <div className="post-content">
              <p className="post-text">{content}</p>
              <div className="post-actions">
                {bookmarkIds?.filter((postId) => _id === postId)?.length > 0 ? (
                  <button className="bookmark-button" onClick={() => removeFromBookmarks(_id)}>
                    <FaBookmark className="bookmark-icon" />
                    
                  </button>
                ) : (
                  <button className="bookmark-button" onClick={() => addToBookmarks(_id)}>
                    <FaRegBookmark className="bookmark-icon" />
                  </button>
                )}
                {!likedBy?.find(({ username }) => username === user.username) ? (
                  <button className="like-button" onClick={() => likeHandler(_id)}>
                    <FaRegHeart className="like-icon" />
                  </button>
                ) : (
                  <button className="like-button" onClick={() => dislikeHandler(_id)}>
                    <FaHeart className="liked-icon" /> 
                  </button>
                  
                )}
                {username === user.username && (
                  <div style={{marginTop : "17px"}}>
                    <button className="edit-button" onClick={() => setEditPostId(_id)}>
                      <FaEdit className="edit-icon" />
                    </button>
                    <button className="delete-button" onClick={() => postDeleteHandler(_id)}>
                      <FaTrash className="delete-icon" />
                    </button>
                  </div>
                )}
              </div>
              <p className="like-count">{likeCount} {likeCount === 1 ? "like" : "likes"}</p>
            </div>
          </li>
        )
      )}
      
      {editPostId && (
  <div className="modal-container">
    <div className="edit-post-container">
    <input
    style={{height:"4rem"}}
            className="edit-post-input"
            defaultValue={state.posts.find((post) => post._id === editPostId).content}
            onChange={(event) => setEditContentInput(event.target.value)}
          />
                    <button className="save-edit-button" style={{margin : "6px"}}  onClick={() => setEditPostId("")}> Cancel </button>

          <button className="save-edit-button" onClick={() => saveEditPost(editPostId, editContentInput)}>
            Save
          </button>
      
    </div>
  </div>
)}
    </div>
    </div>
  </div>

  <div className="right-column">
    <SuggestedUsers />
  </div>
</div>
    
    )
}
 