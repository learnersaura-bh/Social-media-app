import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { Navbar } from "../../Components/Navbar/Navbar";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { FaBookmark, FaRegBookmark ,FaRegHeart, FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Bookmarks = () => {
  const { state, dispatch , getData  ,addToBookmarks , removeFromBookmarks , likeHandler , dislikeHandler , saveEditPost , editPostId, setEditPostId , editContentInput , setEditContentInput , postDeleteHandler, followUser, isFollowing, unfollow , bookmarkIds } = useContext(DataContext);
  const navigate = useNavigate()
  const loggedInUser = localStorage.getItem("user");
  const user = JSON.parse(loggedInUser);
  const filteredPosts = state?.posts?.filter(post => bookmarkIds?.includes(post._id));

  return (
    <div className="container">
  <Navbar />

  <div className="middle-column">
    <div className="home-container">
      <div className="home-container">
    
      <h1 className="home-page-heading">{filteredPosts?.length>0 ? "Bookmarks" : "No Posts in Bookmarks"}</h1>
      {filteredPosts?.map(
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
            <div className="user-info">
              <img className="profile-pic" src={state?.users?.find((user) => user.username === username)?.profileAvatar} alt="Profile pic" onClick={() => navigate(`/profile/${username}`)} />
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
                  <div>
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
<button className="save-edit-button" style={{margin : "6px"}}  onClick={() => setEditPostId("")}> Cancel </button>          <button className="save-edit-button" onClick={() => saveEditPost(editPostId, editContentInput)}>
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
  );
};
