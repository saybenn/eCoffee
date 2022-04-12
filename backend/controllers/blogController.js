import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

//@desc Get all blog post
//@route GET /api/blogs
//@access Public
const getBlogPosts = asyncHandler(async (req, res) => {
  const posts = await Blog.find({});
  if (posts) {
    res.json(posts);
  } else {
    res.status(404);
    throw new Error("Posts not found");
  }
});

//@desc Get top blog posts
//@route GET /api/blogs/top
//@access Public
const getTopBlogPosts = asyncHandler(async (req, res) => {
  const posts = await Blog.find({}).sort({ likes: -1 }).limit(3);
  if (posts) {
    res.json(posts);
  } else {
    res.status(404);
    throw new Error("Posts not found.");
  }
});

//@desc Get own Blog Posts
//@route GET /api/blogs/profile
//@access User
const getOwnBlogPosts = asyncHandler(async (req, res) => {
  const posts = await Blog.find({ user: req.user._id });
  if (posts) {
    res.json(posts);
  } else {
    res.status(404);
    throw new Error("Posts not found");
  }
});

//@desc Get single blog post
//@route GET /api/blogs/:id
//@access Public
const getSingleBlogPost = asyncHandler(async (req, res) => {
  const post = await Blog.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found.");
  }
});

//@desc Create blog post
//@route POST /api/blogs
//@access Author
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, body, image, description } = req.body;

  const post = await Blog.create({
    title,
    body,
    image,
    description,
    user: req.user._id,
    author: req.user.name,
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error("Post could not be created.");
  }
});

//@desc Edit blog post
//@route PUT /api/blogs/:id
//@Access User-Author
const editBlogPost = asyncHandler(async (req, res) => {
  const post = await Blog.findById(req.params.id);

  if (post) {
    post.body = req.body.body;
    post.editedAt = new Date();

    const updatedPost = await post.save();

    res.json({
      title: updatedPost.title,
      author: updatedPost.author,
      date: updatedPost.createdAt,
      editedAt: updatedPost.editedAt,
      body: updatedPost.body,
      comments: updatedPost.comments,
      likes: updatedPost.likes,
    });
  } else {
    res.status(404);
    throw new Error("Post not found.");
  }
});

//@desc Like post
//@route POST /api/blogs/:id/like
//@access User
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const user = await User.findById(req.user._id);
  const post = await Blog.findById(id);
  console.log(post);
  if (post) {
    const alreadyLiked = post.likes.find(
      (l) => l.userid.toString() === user._id.toString()
    );

    if (alreadyLiked) {
      post.likes.remove(alreadyLiked);
      post.numLikes = post.likes.length;

      const updatedPost = await post.save();
      res.status(201).json(updatedPost);
    } else {
      const like = {
        userid: user._id,
        username: user.name,
      };

      await post.likes.push(like);
      post.numLikes = post.likes.length;

      const updatedPost = await post.save();
      res.status(201).json(updatedPost);
    }
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc delete blog post
//@route DELETE /api/blogs
//@access Admin
const deleteBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const post = await Blog.findById(id);

  if (post) {
    await post.remove();
    res.json({ message: "Post deleted" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@desc Comment on blog post
//@route POST /api/blogs/reply
//@access User
const createReply = asyncHandler(async (req, res) => {
  const { id, comment } = req.body;
  const user = await User.findById(req.user._id);
  const post = await Blog.findById(id);

  if (post) {
    const reply = {
      comment,
      username: user.name,
      userid: user._id,
    };

    post.replies.push(reply);

    await post.save();
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error("Could not comment on post");
  }
});

//@desc delete blog comment
//@route DELETE /api/blogs/comment
//@access User
const deleteBlogComment = asyncHandler(async (req, res) => {
  const { blogId, commentId } = req.body;
  const blog = await Blog.findById(blogId);
  const reply = blog.replies.find(
    (r) => r._id.toString() === commentId.toString()
  );
  if (reply) {
    await reply.remove();
    await blog.save();
    res.json(blog.replies);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export {
  getBlogPosts,
  getTopBlogPosts,
  getOwnBlogPosts,
  getSingleBlogPost,
  createBlogPost,
  editBlogPost,
  likePost,
  deleteBlogPost,
  deleteBlogComment,
  createReply,
};
