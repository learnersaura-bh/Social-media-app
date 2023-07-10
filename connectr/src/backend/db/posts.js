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
    image : "https://pbs.twimg.com/media/F0fFMXNaAAAkrI4?format=jpg&name=small" ,
      likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "06/11/2023",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti",
    image : "https://pbs.twimg.com/media/F0fFMXNaAAAkrI4?format=jpg&name=small" ,
      likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe",
    createdAt: "06/11/2021",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti",
    image : "https://pbs.twimg.com/media/F0fFMXNaAAAkrI4?format=jpg&name=small" ,
      likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "pareshaaaaan",
    createdAt: "06/11/2022",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et dapibus libero.",
    image: "http://example.com/post1.jpg",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "anshaal10",
    createdAt: "2023-07-09",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Sed ac semper urna. Morbi at libero pharetra, ullamcorper urna in, consectetur risus.",
    image: "http://example.com/post2.jpg",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe",
    createdAt: "2023-07-08",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Aenean ullamcorper lorem nec nibh laoreet, non rutrum arcu hendrerit.",
    image: "http://example.com/post3.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2023-07-07",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Vivamus feugiat lacus sit amet nisl lobortis, at consectetur ligula facilisis.",
    image: "http://example.com/post4.jpg",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "aditya_jadhav",
    createdAt: "2023-07-06",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Praesent sem elit, congue at efficitur vel, convallis id enim.",
    image: "http://example.com/post5.jpg",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "pareshaaaaan",
    createdAt: "2023-07-05",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Nullam euismod enim a magna efficitur, sit amet placerat mi congue.",
    image: "http://example.com/post6.jpg",
    likes: {
      likeCount: 7,
      likedBy: [],
      dislikedBy: [],
    },
    username: "anshaal10",
    createdAt: "2023-07-04",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Fusce vel justo sed nulla porttitor scelerisque non nec enim.",
    image: "http://example.com/post7.jpg",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "aditya_jadhav",
    createdAt: "2023-07-03",
    updatedAt: formatDate(),
  }
];
