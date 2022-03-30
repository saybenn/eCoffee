import express from "express";
const router = express.Router();
import {
  createOrder,
  updateOrderPaid,
  updateOrderDelivered,
  getAllOrders,
  getOrderById,
  getOwnOrders,
  updateOrderShipping,
} from "../controllers/orderController.js";
import { protect, admin } from "../middle/authMiddleware.js";

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.get("/profile", protect, getOwnOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/deliver", protect, admin, updateOrderDelivered);
router.put("/:id/pay", protect, updateOrderPaid);
router.put("/:id/shipping", protect, updateOrderShipping);
export default router;
