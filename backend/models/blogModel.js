import mongoose from "mongoose";

const replySchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const likeSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "User",
  },
  username: {
    type: String,
    required: true,
  },
});
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    likes: [likeSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
