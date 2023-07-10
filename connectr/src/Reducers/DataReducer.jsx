// export const initialState = {
//   posts: [],
//   filteredPosts: [],
//   sortBy: "",
// };

// export const DataReducer = (state, { type, payload }) => {
//   switch (type) {
//     case "User_Posts":
//       return { ...state, posts: payload , filteredPosts: payload};
//     case "Sort_Posts":
//       if (payload === "trending") {
//         return {
//           ...state,
//           filteredPosts: state.posts.sort(
//             (a, b) => b.likes.likeCount - a.likes.likeCount
//           ),
//           sortBy: payload,
//         };
//       } else if (payload === "oldest") {
//         return {
//           ...state,
//           filteredPosts: state.posts.sort(
//             (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//           ),
//           sortBy: payload,
//         };
//       } else if (payload === "newest") {
//         return {
//           ...state,
//           filteredPosts: state.posts.sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//           ),
//           sortBy: payload,
//         };
//       } else {
//         return { ...state, filteredPosts: state.posts  , sortBy : "default"};
//       }
//     default:
//       return state;
//   }
// };
export const initialState = {
  posts: [],
  users: [],
  filteredPosts: [],
  sortBy: "",
  user: "",
  bookmarkPosts: [],
  updatedUsers : []
};

export const DataReducer = (state, { type, payload }) => {
  switch (type) {
    case "User_Posts":
      const updatedPosts = [...payload];
      let updatedFilteredPosts = [...payload];

      if (state.sortBy === "trending") {
        updatedFilteredPosts = updatedFilteredPosts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
      } else if (state.sortBy === "oldest") {
        updatedFilteredPosts = updatedFilteredPosts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (state.sortBy === "newest") {
        updatedFilteredPosts = updatedFilteredPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      return {
        ...state,
        posts: updatedPosts,
        filteredPosts: updatedFilteredPosts,
      };
    case "Sort_Posts":
      let sortedFilteredPosts = [...state.filteredPosts];

      if (payload === "trending") {
        sortedFilteredPosts = sortedFilteredPosts.sort(
          (a, b) => b.likes.likeCount - a.likes.likeCount
        );
      } else if (payload === "oldest") {
        sortedFilteredPosts = sortedFilteredPosts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (payload === "newest") {
        sortedFilteredPosts = sortedFilteredPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      return {
        ...state,
        filteredPosts: sortedFilteredPosts,
        sortBy: payload,
      };
    case "Users_List":
      return { ...state, users: payload };
    case "User":
      return { ...state, user: payload };
    case "bookmark_Post":
      return { ...state, bookmarkPosts: payload };
      case "Users_List_After_Follow":
        return {...state , users : payload}
        case "Update_User":
      const updatedUser = payload;
      const updatedUsers = state.users.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      );

      return {
        ...state,
        users: updatedUsers
      };
    default:
      return state;
  }
};
