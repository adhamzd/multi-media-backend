import mongoose from "mongoose";
import Feedback from "../Models/FeedbackModel.js";
import asyncHandler from "express-async-handler";

const ObjectID = mongoose.Types.ObjectId;

const getAllFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({});

  if (!feedback) {
    res.status(404);
    throw new Error("feedback not found");
  }
  res.status(200).json({
    data: feedback,
  });
});

const getFeedback = asyncHandler(async (req, res) => {
  let { id } = req.params;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const feedback = await Feedback.findById(id);

  if (feedback) {
    return res.status(200).json({
      data: feedback,
    });
  }
  res.status(404);
  throw new Error("feedback not found");
});

const addFeedback = asyncHandler(async (req, res) => {
  // const { message, email } = req.body;

  if (!req.body) {
    return res.status(404).json({
      error: true,
      message: `bad request`,
    });
  }
  const feedback = await Feedback.create({
    email: req.body.email,
    message: req.body.message,
  });
  return res.status(200).json({
    message: "feedback added succesfully",
    data: feedback,
  });
});

const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const feedback = await Feedback.findById(id);

  if (!feedback) {
    res.status(404);
    throw new Error("feedback not found");
  }
  feedback.deleteOne({ _id: id });
  return res.status(404).json({
    message: `Feedback with id ${id} has been deleted successfully`,
  });
});

const editFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { message, email } = req.body;

  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }

  const checkFeedback = await Feedback.findById(id);

  if (!checkFeedback) {
    res.status(404);
    throw new Error("feedback not found");
  }
  if (!message || !email) {
    res.status(400);
    throw new Error("bad request");
  }
  if (!checkFeedback.save()) {
    res.status(400);
    throw new Error("bad request");
  }
  checkFeedback.email = email;
  checkFeedback.message = message;
  return res.status(201).json({
    message: "feedback is updated",
    data: checkFeedback,
  });
});
const FeedbackController = {
  getAllFeedback,
  getFeedback,
  deleteFeedback,
  editFeedback,
  addFeedback,
};
export default FeedbackController;
