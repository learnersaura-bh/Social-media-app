import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export const Home = () => {
  const { state, dispatch } = useContext(DataContext);
  console.log(state);
  const handleDropdownChange = (event) => {
    dispatch({ type: "Sort_Posts", payload: event.target.value });
  };
  return (
    <div>
      {/* <label htmlFor="sort-posts">Sort By:</label> */}
      <select
        value={state.sortBy}
        id="sort-posts"
        onChange={handleDropdownChange}
      >
        <option value="default">Sort By</option>
        <option value="trending">Trending</option>
        <option value="oldest">Oldest</option>
        <option value="newest">Newest</option>
      </select>
      <h1>Home</h1>
      {state?.filteredPosts?.map(
        ({ content, likes: { likeCount }, createdAt }) => (
          <li>
            {content}
            <p>{likeCount}</p>
            <p>{createdAt}</p>
          </li>
        )
      )}
    </div>
  );
};
