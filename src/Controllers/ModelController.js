import mongoose from "mongoose";
import Model from "../Models/ModelModel.js";
import asyncHandler from "express-async-handler";

const ObjectID = mongoose.Types.ObjectId;

const getAllModels = asyncHandler(async (req, res) => {
  const models = await Model.find({});

  if (!models) {
    res.status(404).json({
      message: "No models exist",
    });
  }
  res.status(200).json({
    data: models,
  });
});

const getModel = asyncHandler(async (req, res) => {
  let { id } = req.params;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const result = await Model.findById(id);

  // console.log(result);
  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  res.status(404);
  throw new Error("model not found");
});

const addModel = asyncHandler(async (req, res) => {
  // const { brand, model } = await req.body;

  if (!req.body) {
    return res.status(404).json({
      error: true,
      message: `bad request`,
    });
  }
  const model = await Model.create({
    brand: req.body.brand,
    model: req.body.model,
  });
  return res.status(200).json({
    message: "model added succesfully",
    model: model,
  });
});

const deleteModel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const model = await Model.findById(id);

  if (!model) {
    return res.status(404).json({
      error: true,
      message: `Model with id ${id} does not exist`,
    });
  }
  model.deleteOne({ _id: id });
  return res.status(404).json({
    message: `Model with id ${id} has been deleted successfully`,
  });
});

const editModel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { brand, model } = req.body;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const checkModel = await Model.findById(id);

  if (!checkModel) {
    return res.status(404).json({
      msg: "not found",
    });
  }
  if (!model || !brand) {
    return res.status(400).json({
      msg: "bad request, not all data entered",
    });
  }
  checkModel.model = model.toLowerCase();
  checkModel.brand = brand.toLowerCase();
  if (!checkModel.save()) {
    return res.status(400).json({
      msg: "bad request",
    });
  }
  return res.status(201).json({
    msg: "model is updated",
    data: checkModel,
  });
});
const ModelController = {
  getAllModels,
  getModel,
  deleteModel,
  editModel,
  addModel,
};
export default ModelController;
