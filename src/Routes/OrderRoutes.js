import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../Controllers/OrderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
