import { useContext, useState } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { Navbar } from "../../Components/Navbar/Navbar";

import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import "./Home.css";
import { setPosts, setSortBy } from "../../actions/actions";
import { sortedPosts } from "../../utils";
import { useAuthContext } from "../../Contexts/AuthContext";
import { PostCard } from "../../Components/PostCard/PostCard";
export const Home = () => {
  const { state, dispatch } = useContext(DataContext);
  const [inputPostValue, setInputPostValue] = useState("");
  const {
    loginDetails: { encodedToken: token, foundUser },
  } = useAuthContext();

  const handlePostsSortBy = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const postSubmitHandler = async () => {
    const newPost = {
      content: inputPostValue,
    };
    try {
      const postToBeAdded = {
        postData: newPost,
      };
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: token },
        body: JSON.stringify(postToBeAdded),
      });
      const { posts } = await response.json();
      dispatch(setPosts(posts));
    } catch (e) {
      console.log(e);
    }
    setInputPostValue("");
  };

  const loggedUser = state?.users?.find((user) => user._id === foundUser._id);
  const followingUsersPost = state?.posts?.filter(
    (post) =>
      loggedUser?.following.some((user) => user.username === post.username) ||
      post.username === loggedUser?.username
  );

  const postsToDisplay = sortedPosts(state.sortBy, followingUsersPost);

  return (
    <div className="container">
      <div className="left-column">
        <Navbar />
      </div>

      <div className="middle-column">
        <div className="home-container">
          <div className="post-input-container">
            <img
              className="profile-pic"
              src={
                loggedUser?.profileAvatar ||
                "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
              }
              alt="profile pic"
            />
            <input
              className="post-input"
              type="text"
              value={inputPostValue}
              onChange={(e) => setInputPostValue(e.target.value)}
              placeholder="What's on your mind?"
            />
            <button className="submit-button" onClick={postSubmitHandler}>
              Post
            </button>
          </div>
          <div className="sort-by">
            <div>{state.sortBy} Posts: </div>
            <select
              className="sort-posts-select"
              value={state.sortBy}
              onChange={handlePostsSortBy}
            >
              <option value="" disabled>
                Sort By
              </option>
              <option value="Trending">Trending</option>
              <option value="Oldest">Oldest</option>
              <option value="Latest">Latest</option>
            </select>
          </div>
          {!loggedUser ? (
            <h2>User not found, please logout and login again.</h2>
          ) : postsToDisplay.length === 0 ? (
            <h2>Follow some users to see the posts.</h2>
          ) : (
            <ul>
              {postsToDisplay.map((post) => (
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
