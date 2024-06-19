export const sortedPosts = (sortBy, posts) => {
  let sorted = [...posts];
  if (sortBy === "Trending") {
    sorted.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  } else if (sortBy === "Oldest") {
    sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === "Latest") {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return sorted;
};
