import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { Navbar } from "../../Components/Navbar/Navbar";
import { FaBookmark, FaRegBookmark ,FaRegHeart, FaHeart, FaTrash, FaEdit } from "react-icons/fa";
// import { AiOutlinePicture } from "react-icons/ai";
// import { GrFormAdd } from "react-icons/gr";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
// import { formatDate } from "../../backend/utils/authUtils";
import "./Home.css"
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const { state, dispatch , getData  ,addToBookmarks , removeFromBookmarks , likeHandler , dislikeHandler , saveEditPost , editPostId, setEditPostId , editContentInput , setEditContentInput , postDeleteHandler, followUser, isFollowing, unfollow , bookmarkIds } = useContext(DataContext);
  const [inputPostValue, setInputPostValue] = useState();
  const navigate = useNavigate()
  // const [following, setFollowing] = useState();

const loggedInUser = localStorage.getItem("user");
const user = JSON.parse(loggedInUser);

// const followedUsernames = state?.users?.find(({ username }) => user.username === username)?.followings.map(({username}) => username);

const followedUsernames =  state?.users?.find(({ username }) => user.username === username)?.followings?.map(({username}) => username)

let followedUserPosts = [];
if (followedUsernames) {
  followedUserPosts = state?.filteredPosts?.filter((post) => followedUsernames.includes(post.username));
}

console.log(followedUserPosts, "followed user posts abcdefghijklopqrstuvwxyz");
console.log(followedUsernames, "followed usernames abcdefghijklopqrstuvwxyz");


  const handleDropdownChange = (event) => {
    dispatch({ type: "Sort_Posts", payload: event.target.value });
  };
  const postInputHandler = (e) => {
    setInputPostValue(e.target.value);
  };
  const postSubmitHandler = async () => {
    // const currentTime = new Date();
    // const formattedTime = currentTime.toLocaleDateString();
    // console.log("formatted date :", formattedTime);
    const newPost = {
      _id: uuid(),
      content: inputPostValue,
      // likes: {
      //   likeCount: 0,
      //   likedBy: [],
      //   dislikedBy: [],
      // },
      // username: "adarshbalika",
      // createdAt: formattedTime,
      // updatedAt: formatDate(),
    };
    try {
      const postToBeAdded = {
        postData: newPost,
      };
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: localStorage?.getItem("token") },
        body: JSON.stringify(postToBeAdded),
      });
      // console.log(await response.json());
      const res = await fetch("/api/posts");
      const { posts } = await res.json();
      // console.log("post after adding :", posts);
      getData();
    } catch (e) {
      // console.log(e);
    }
    setInputPostValue("");
  };
  
  // const saveEditPost = async (postId, editedPostContent) => {
  //   try {
  //     const editContent = { postData: { content: editedPostContent } };
  //     // console.log("textarea value:", editedPostContent);
  //     const response = await fetch(`/api/posts/edit/${postId}`, {
  //       method: "POST",
  //       headers: {
  //         authorization: localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify(editContent),
  //     });
  //     // console.log("response after edit", await response.json());
  //     getData();
  //     setEditPostId(null);
  //   } catch (e) {
  //     // console.log(e);


  //   }
  // };
  
  return (
    <div className="container">
  <Navbar />

  <div className="middle-column">
    <div className="home-container">
      <div className="home-container">
      <div className="post-input-container">
        <input
          className="post-input"
          type="text"
          value={inputPostValue}
          onChange={postInputHandler}
          placeholder="What's on your mind?"
        />
        <button className="submit-button" onClick={postSubmitHandler}>
          Submit
        </button>
      </div>
      <select className="sort-posts-select" value={state.sortBy} onChange={handleDropdownChange}>
        <option value="default">Sort By</option>
        <option value="trending">Trending</option>
        <option value="oldest">Oldest</option>
        <option value="newest">Newest</option>
      </select>
      <h1 className="home-page-heading">Home Page</h1>
      {state?.filteredPosts?.map(
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
              <img className="profile-pic" src={state?.users?.find((user) => user.username === username)?.profileAvatar} alt="Profile pic" onClick={() => navigate(`/profile/${username}`)}/>
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
        <div className="edit-post-container">
          <input
            className="edit-post-input"
            defaultValue={state.posts.find((post) => post._id === editPostId).content}
            onChange={(event) => setEditContentInput(event.target.value)}
          />
          <button className="save-edit-button" onClick={() => saveEditPost(editPostId, editContentInput)}>
            Save
          </button>
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
