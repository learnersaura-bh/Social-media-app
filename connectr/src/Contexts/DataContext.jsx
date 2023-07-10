import { createContext, useEffect, useReducer, useState } from "react";
import { DataReducer, initialState } from "../Reducers/DataReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [bookmarkIds , setBookmarkIds] = useState()
  const [editPostId, setEditPostId] = useState();
  const [editContentInput, setEditContentInput] = useState();
  const loggedUser = localStorage?.getItem("user");
const {username : loggedUserName } = JSON?.parse(loggedUser);
  const getData = async () => {
    try {
      // fetching landing page posts
      const response = await fetch("/api/posts");
      const { posts } = await response.json();
      dispatch({ type: "User_Posts", payload: posts });
      const usersList = await fetch("/api/users");
      const {users} = await usersList.json()
      console.log(users,"users List");
      dispatch({type: "Users_List" , payload : users})
      const userResponse = await fetch("/api/users/123");
      const { user } = await userResponse.json();
      
      console.log(user, "user");
      dispatch({ type: "User", payload: user });
    //   const bookmarkPosts = await state.posts.filter(post => state?.user?.bookmarks.includes(post._id));
    //       console.log(bookmarkPosts , "bookmark ho gya");
    //       dispatch({type:"bookmark_Post" , payload : bookmarkPosts})
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, state);
  const addToBookmarks = async (bookmarkId) => {
    try {
      const response = await fetch(`/api/users/bookmark/${bookmarkId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("token") },
      });
      // console.log(await response.json() , "response after adding to bookmark");
      const { bookmarks } = await response.json();
// setBookmarkIds(bookmarks)
console.log(bookmarks , "bookmarksIds hain ye to");
setBookmarkIds(bookmarks)
console.log(bookmarkIds , "bookmarksids abcdefghijklomnopqrstuvwxyz");
      // console.log(bookmarkPostId, "bookmark ");
      // const bookmarkPosts = await state.posts.filter((post) =>
        // bookmarkPostId?.includes(post._id)
      // );
      // console.log(bookmarkPosts, "bookmark ho gya");
      // dispatch({ type: "bookmark_Post", payload: bookmarkPosts });
      getData();
    } catch (e) {
      // console.log(e);
    }
  };
  const removeFromBookmarks = async (bookmarkId) => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${bookmarkId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("token") },
      });
      // console.log(await response.json() , "response after adding to bookmark");
      const { bookmarks: bookmarkPostId } = await response.json();
      // console.log(bookmarkPostId, "bookmark  removed");
      setBookmarkIds(bookmarkPostId)
      const bookmarkPosts = await state?.posts.filter((post) =>
        bookmarkPostId?.includes(post._id)
      );
      // console.log(bookmarkPosts, "bookmark ho gya");
      dispatch({ type: "bookmark_Post", payload: bookmarkPosts });
      getData();
      
    } catch (e) {
      // console.log(e);
    }
  };

  const likeHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("token") },
      });
      const { posts } = await response.json();
      // console.log("data after like:", posts);
      getData();
    } catch (e) {
      // console.log(e);
    }
  };
  
  const dislikeHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("token") },
      });
      const { posts } = await response.json();
      // console.log("data after dislike:", posts);
      getData();
    } catch (e) {
      // console.log(e);
    }
  };
  const saveEditPost = async (postId, editedPostContent) => {
    try {
      const editContent = { postData: { content: editedPostContent } };
      // console.log("textarea value:", editedPostContent);
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(editContent),
      });
      // console.log("response after edit", await response.json());
      getData();
      setEditPostId(null);
    } catch (e) {
      // console.log(e);
    }
  };

  //////////////////////////////////////////////////////
  const postDeleteHandler = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { authorization: localStorage.getItem("token") },
      });
      // console.log("response after delete post:", await response.json());
      getData();
    } catch (e) {
      // console.log(e);
    }
  };

  const followUser = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("token") },
      });
      const { user: followedBy, followUser } = await response.json();
      // console.log("User:", followedBy);
      // console.log("Followed User:", followUser);
      const updatedUsers = state?.users?.map((user) =>
        user._id === followUser._id
          ? {
              ...user,
              followers: [...user?.follower, followedBy],
              follower: [...user.follower, followedBy],
            }
          : user
      );
      // console.log(updatedUsers);
      dispatch({ type: "Users_List_After_Follow", payload: updatedUsers });
      // getData();
    } catch (e) {
      // console.log(e);
    }
  };
  const isFollowing = (id) => {
    const xyz = state.users
      ?.find(({ _id }) => id === _id)
      .follower?.find(({ username }) => username === loggedUserName);
    console.log(xyz ? "true follower" : "false follower");
    return xyz ? true : false;
  };
  const unfollow = async (id) => {
    try {
      const response = await fetch(`/api/users/unfollow/${id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("token") },
      });
      // console.log(await response.json());
      const { user: followedBy, followUser } = await response.json();
      // console.log("User:", followedBy);
      // console.log("Followed User:", followUser);
      const updatedUsers = state?.users?.map((user) =>
        user._id === followUser._id
          ? {
              ...user,
              followers: user.follower.filter(
                ({ username }) => username !== followedBy.username
              ),
              follower: user.follower.filter(
                ({ username }) => username !== followedBy.username
              ),
            }
          : user
      );
      // console.log(updatedUsers);
      dispatch({ type: "Users_List_After_Follow", payload: updatedUsers });
      console.log(updatedUsers);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div>
      <DataContext.Provider value={{ state, dispatch, getData , 
        addToBookmarks , removeFromBookmarks, bookmarkIds , likeHandler , dislikeHandler , saveEditPost , editPostId, setEditPostId , editContentInput , setEditContentInput , postDeleteHandler, followUser, isFollowing, unfollow}}>
        {children}
      </DataContext.Provider>
    </div>
  );
};
