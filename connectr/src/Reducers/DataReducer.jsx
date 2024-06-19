import { actionTypes } from "../actions/actionTypes";

export const initialState = {
  posts: [],
  users: [],
  filteredPosts: [],
  sortBy: "Latest",
  user: "",
  bookmarks: [],
  bookmarkPosts: [],
  updatedUsers: [],
};

export const DataReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_POSTS:
      return { ...state, posts: payload };
    case actionTypes.SET_SORT_BY:
      return { ...state, sortBy: payload };
    case actionTypes.GET_BOOKMARKS:
    case actionTypes.ADD_BOOKMARK:
    case actionTypes.REMOVE_BOOKMARK:
      return { ...state, bookmarks: payload };
    case actionTypes.EDIT_USER_PROFILE:
      const updatedUsers = state.users.map((user) =>
        user._id === payload?._id ? payload : user
      );
      return { ...state, users: updatedUsers };
    case actionTypes.FOLLOW_USER:
    case actionTypes.UNFOLLOW_USER:
      const { followedBy, followUser } = payload;
      const updatedUserList = state.users.map((user) => {
        if (user._id === followedBy._id) {
          return followedBy;
        } else if (user._id === followUser._id) {
          return followUser;
        }
        return user;
      });
      return { ...state, users: updatedUserList };
    case actionTypes.SET_USERS:
      return { ...state, users: payload };
    case actionTypes.LOGIN_USER:
      return { ...state, users: [...state.users, payload] };
    default:
      return state;
  }
};
