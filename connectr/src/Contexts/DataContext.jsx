import { createContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { DataReducer, initialState } from "../Reducers/DataReducer";
import {
  addBookmark,
  followUserProfile,
  getBookmarks,
  removeBookmark,
  setPosts,
  setUsers,
  unfollowUserProfile,
} from "../actions/actions";
import { useAuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { loginDetails } = useAuthContext();
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [editPostId, setEditPostId] = useState();
  const [editContentInput, setEditContentInput] = useState();
  const getData = async () => {
    try {
      const postsResponse = await fetch("/api/posts");
      const { posts } = await postsResponse.json();
      dispatch(setPosts(posts));
      const usersList = await fetch("/api/users");
      const { users } = await usersList.json();
      dispatch(setUsers(users));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchBookMarksIds = async () => {
      try {
        const response = await fetch("/api/users/bookmark", {
          headers: {
            authorization: loginDetails?.encodedToken,
          },
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch bookmarks.");
        }
        const { bookmarks } = await response.json();
        dispatch(getBookmarks(bookmarks));
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    getData();
    if (loginDetails?.encodedToken) {
      fetchBookMarksIds();
    }
  }, [loginDetails]);
  const addToBookmarks = async (postId) => {
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { bookmarks } = await response.json();
      dispatch(addBookmark(bookmarks));
      toast.success("Post added to bookmarks.");
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromBookmarks = async (bookmarkId) => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${bookmarkId}`, {
        method: "POST",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { bookmarks } = await response.json();
      dispatch(removeBookmark(bookmarks));
      toast.success("Post removed from bookmarks.");
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { posts } = await response.json();
      dispatch(setPosts(posts));
    } catch (e) {
      console.log(e);
    }
  };

  const dislikeHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { posts } = await response.json();
      dispatch(setPosts(posts));
    } catch (e) {
      console.log(e);
    }
  };
  const saveEditPost = async (postId, editedPostContent) => {
    try {
      const editContent = { postData: { content: editedPostContent } };
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(editContent),
      });
      const { posts } = await response.json();
      dispatch(setPosts(posts));
      setEditPostId(null);
    } catch (e) {
      console.log(e);
    }
  };

  const postDeleteHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { posts } = await response.json();
      setTimeout(() => {
        dispatch(setPosts(posts));
        toast.success("Post Deleted Successfully");
      }, 220);
    } catch (e) {
      console.log(e);
    }
  };

  const followUser = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { user, followUser } = await response.json();
      dispatch(followUserProfile({ followedBy: user, followUser }));
      toast.success(`@${followUser.username} followed`);
    } catch (e) {
      console.log(e);
    }
  };
  const isFollowing = (userId) => {
    const isFollowed = state.users
      ?.find(({ _id }) => userId === _id)
      .followers?.find(
        ({ username }) => username === loginDetails?.foundUser.username
      );
    return isFollowed ? true : false;
  };
  const unfollow = async (id) => {
    try {
      const response = await fetch(`/api/users/unfollow/${id}`, {
        method: "POST",
        headers: { authorization: loginDetails?.encodedToken },
      });
      const { user, followUser } = await response.json();
      dispatch(unfollowUserProfile({ followedBy: user, followUser }));
      toast.success(`@${followUser.username} unfollowed`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <DataContext.Provider
        value={{
          state,
          dispatch,
          getData,
          addToBookmarks,
          removeFromBookmarks,
          likeHandler,
          dislikeHandler,
          saveEditPost,
          editPostId,
          setEditPostId,
          editContentInput,
          setEditContentInput,
          postDeleteHandler,
          followUser,
          isFollowing,
          unfollow,
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};
