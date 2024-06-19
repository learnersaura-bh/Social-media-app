import { actionTypes } from "./actionTypes";

export const setPosts = (posts) => {
  return {
    type: actionTypes.SET_POSTS,
    payload: posts,
  };
};

export const setUsers = (users) => {
  return {
    type: actionTypes.SET_USERS,
    payload: users,
  };
};

export const loginUser = (user) => {
  return { type: actionTypes.LOGIN_USER, payload: user };
};

export const setSortBy = (sortBy) => {
  return {
    type: actionTypes.SET_SORT_BY,
    payload: sortBy,
  };
};

export const getBookmarks = (bookmarks) => {
  return {
    type: actionTypes.GET_BOOKMARKS,
    payload: bookmarks,
  };
};
export const addBookmark = (bookmarks) => {
  return {
    type: actionTypes.ADD_BOOKMARK,
    payload: bookmarks,
  };
};
export const removeBookmark = (bookmarks) => {
  return {
    type: actionTypes.REMOVE_BOOKMARK,
    payload: bookmarks,
  };
};

export const editUserProfile = (updatedUser) => {
  return {
    type: actionTypes.EDIT_USER_PROFILE,
    payload: updatedUser,
  };
};

export const followUserProfile = (payload) => {
  return {
    type: actionTypes.FOLLOW_USER,
    payload,
  };
};
export const unfollowUserProfile = (payload) => {
  return {
    type: actionTypes.UNFOLLOW_USER,
    payload,
  };
};
