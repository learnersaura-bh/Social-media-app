import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { Navbar } from "../../Components/Navbar/Navbar";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { PostCard } from "../../Components/PostCard/PostCard";

import "../Home/Home.css";

export const Bookmarks = () => {
  const { state } = useContext(DataContext);

  const postsToDisplay = state.bookmarks.map((bookmarkPostId) =>
    state?.posts.find((post) => post._id === bookmarkPostId)
  );

  return (
    <div className="container">
      <div className="left-column">
        <Navbar />
      </div>

      <div className="middle-column">
        <div className="home-container">
          <h1 className="home-page-heading">Bookmarks</h1>
          <br />
          <hr />
          <br />
          {postsToDisplay.length > 0 ? (
            <ul>
              {postsToDisplay.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </ul>
          ) : (
            <h2>No Posts in Bookmarks.</h2>
          )}
        </div>
      </div>

      <div className="right-column">
        <SuggestedUsers />
      </div>
    </div>
  );
};
