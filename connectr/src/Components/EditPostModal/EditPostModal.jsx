import { useContext, useState } from "react";
import "./EditPostModal.css";
import { setPosts } from "../../actions/actions";
import { DataContext } from "../../Contexts/DataContext";

export const EditPostModal = ({
  _id,
  textContent,
  user,
  setShowModal,
  token,
}) => {
  const [postInput, setPostInput] = useState(textContent);
  const { dispatch } = useContext(DataContext);

  const editPost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ postData: { content: postInput } }),
      });
      const { posts } = await response.json();
      dispatch(setPosts(posts));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="edit-post">
          <img
            src={user.profileAvatar}
            alt={user?.username}
            className="profile-pic"
          />
          <textarea
            className="edit-post-textarea"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          ></textarea>
        </div>
        <div className="edit-post-button">
          <button onClick={() => editPost(_id)}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
