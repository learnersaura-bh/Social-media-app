export const initialState = {
  posts: [],
  filteredPosts: [],
  sortBy: "",
};

export const DataReducer = (state, { type, payload }) => {
  switch (type) {
    case "User_Posts":
      return { ...state, posts: payload , filteredPosts: state.posts};
    case "Sort_Posts":
      if (payload === "trending") {
        return {
          ...state,
          filteredPosts: state.posts.sort(
            (a, b) => b.likes.likeCount - a.likes.likeCount
          ),
          sortBy: payload,
        };
      } else if (payload === "oldest") {
        return {
          ...state,
          filteredPosts: state.posts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          ),
          sortBy: payload,
        };
      } else if (payload === "newest") {
        return {
          ...state,
          filteredPosts: state.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ),
          sortBy: payload,
        };
      } else {
        return { ...state, filteredPosts: state.posts  , sortBy : "default"};
      }
    default:
      return state;
  }
};
