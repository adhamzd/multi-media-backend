import express from "express";
const router = express.Router();
import FeedbackController from "../Controllers/FeedbackController.js";

router
  .get("/", FeedbackController.getAllFeedback)
  .post("/", FeedbackController.addFeedback);
router
  .get("/:id", FeedbackController.getFeedback)
  .put("/:id", FeedbackController.editFeedback)
  .delete("/:id", FeedbackController.deleteFeedback);

export default router;
// module.exports = router;
