import { useContext, useState } from "react";
import "./PostCard.css";
import {
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaHeart,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Contexts/DataContext";
import { useAuthContext } from "../../Contexts/AuthContext";
import { EditPostModal } from "../EditPostModal/EditPostModal";

export const PostCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    state,
    likeHandler,
    dislikeHandler,
    addToBookmarks,
    removeFromBookmarks,
    postDeleteHandler,
  } = useContext(DataContext);
  const { loginDetails } = useAuthContext();
  const { _id, content, likes, createdAt, mediaURL, mediaAlt, username } = post;

  const user = state?.users?.find((user) => user?.username === username);

  const handleLikeClick = (id, likedBy, currentUser) => {
    if (likedBy.some((user) => user.username === currentUser?.username)) {
      dislikeHandler(id);
    } else {
      likeHandler(id);
    }
  };

  return (
    <div className="post-card">
      <div
        className="user-information"
        onClick={() => {
          navigate(`/profile/${user?.username}`);
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <img
          className="profile-pic"
          src={user?.profileAvatar}
          alt="User profile"
        />
        <div className="user-details">
          <span className="user-name">
            {user?.firstName} {user?.lastName}{" "}
          </span>
          <span className="handle">
            @{user?.username} · {new Date(createdAt).toLocaleDateString()}{" "}
          </span>
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
        {mediaURL?.endsWith(".mp4") ? (
          <video controls className="post-video">
            <source src={mediaURL} type="video/mp4" />
          </video>
        ) : (
          <img src={mediaURL} className="post-image" alt={mediaAlt} />
        )}
      </div>
      <hr className="ruler" />

      <div className="post-actions">
        <span
          onClick={() =>
            handleLikeClick(_id, likes.likedBy, loginDetails?.foundUser)
          }
        >
          {likes.likedBy.some(
            (user) => user.username === loginDetails?.foundUser.username
          ) ? (
            <FaHeart color="red" title="Dislike" />
          ) : (
            <FaRegHeart title="Like" className="like" />
          )}{" "}
          {likes.likeCount}
        </span>
        <span>
          {state.bookmarks.includes(_id) ? (
            <FaBookmark
              onClick={() => removeFromBookmarks(_id)}
              title="Remove from bookmark"
            />
          ) : (
            <FaRegBookmark
              onClick={() => addToBookmarks(_id)}
              title="Bookmark"
            />
          )}
        </span>

        {loginDetails?.foundUser.username === username && (
          <span onClick={() => setShowModal((prev) => !prev)}>
            <FaEdit />
          </span>
        )}
        {loginDetails?.foundUser.username === username && (
          <span>
            <FaTrash onClick={() => postDeleteHandler(_id)} title="Delete" />
          </span>
        )}
      </div>
      {showModal && (
        <EditPostModal
          _id={_id}
          textContent={content}
          user={loginDetails?.foundUser}
          setShowModal={setShowModal}
          token={loginDetails?.encodedToken}
        />
      )}
    </div>
  );
};
