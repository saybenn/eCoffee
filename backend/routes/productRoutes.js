import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  getTopProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  deleteReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middle/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router.post("/:id/review", protect, createReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.delete("/:id/review/:rid", protect, admin, deleteReview);

export default router;
