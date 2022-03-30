import express from "express";
const router = express.Router();
import {
  getBlogPosts,
  getOwnBlogPosts,
  getTopBlogPosts,
  getSingleBlogPost,
  createBlogPost,
  editBlogPost,
  likePost,
  deleteBlogPost,
  createReply,
  deleteBlogComment,
} from "../controllers/blogController.js";
import { protect, author, admin } from "../middle/authMiddleware.js";

router
  .route("/")
  .get(getBlogPosts)
  .post(protect, author, createBlogPost)
  .delete(protect, author, deleteBlogPost);
router
  .route("/reply")
  .delete(protect, deleteBlogComment)
  .post(protect, createReply);
router.get("/profile", protect, author, getOwnBlogPosts);
router.get("/top", getTopBlogPosts);
router.route("/:id").get(getSingleBlogPost).put(protect, author, editBlogPost);
router.post("/like", protect, likePost);
export default router;
