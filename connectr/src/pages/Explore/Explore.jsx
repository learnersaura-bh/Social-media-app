import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { SuggestedUsers } from "../../Components/SuggestedUsers/SuggestedUsers";
import { Navbar } from "../../Components/Navbar/Navbar";
import "../Home/Home.css";
import { sortedPosts } from "../../utils";
import { PostCard } from "../../Components/PostCard/PostCard";
export const Explore = () => {
  const { state } = useContext(DataContext);

  const postsToDisplay = sortedPosts("", state?.posts);

  return (
    <div className="container">
      <div className="left-column">
        <Navbar />
      </div>

      <div className="middle-column">
        <div className="home-container">
          <h1 className="home-page-heading">Explore</h1>
          <ul>
            {postsToDisplay.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </ul>
        </div>
      </div>

      <div className="right-column">
        <SuggestedUsers />
      </div>
    </div>
  );
};
