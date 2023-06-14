import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deis aut rerum ",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2021-05-11",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti",
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",
    createdAt: "2023-05-11",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "samarth",
    createdAt: "2022-05-11",
    updatedAt: formatDate(),
  },
];
