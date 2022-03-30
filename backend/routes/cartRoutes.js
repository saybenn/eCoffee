import express from "express";
const router = express.Router();
import {
  getUserCart,
  addItemToCart,
  cartControls,
} from "../controllers/cartController.js";
import { protect } from "../middle/authMiddleware.js";

router
  .route("/")
  .post(protect, addItemToCart)
  .get(protect, getUserCart)
  .put(protect, cartControls);
export default router;
