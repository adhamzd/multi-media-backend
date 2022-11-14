import mongoose from "mongoose";
import Category from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";
const ObjectID = mongoose.Types.ObjectId;

const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.find({});

  if (!category) {
    res.status(404).json({
      message: "No models exist",
    });
  }
  res.status(200).json({
    data: category,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  let { id } = req.params;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const category = await Category.findById(id);

  // console.log(result);
  if (category) {
    return res.status(200).json({
      data: category,
    });
  }
  res.status(404);
  throw new Error("category not found");
});

const addCategory = asyncHandler(async (req, res) => {
  if (!req.body || !req.file) {
    res.status(404);
    throw new Error("bad request");
  }

  const category = new Category({
    title: req.body.title,
    description: req.body.description,
    image: req.file.path,
  });

  const isCreated = await category.save();

  if (isCreated) {
    return res.status(201).json({
      message: "category added succesfully",
      category: category,
    });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      error: true,
      message: `category with id ${id} does not exist`,
    });
  }
  category.deleteOne({ _id: id });
  return res.status(201).json({
    message: `category with id ${id} has been deleted successfully`,
  });
});

const editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!ObjectID.isValid(id)) {
    throw new Error("invalid ID");
  }
  const checkCategory = await Category.findById(id);

  if (!checkCategory) {
    return res.status(404).json({
      msg: "not found",
    });
  }
  if (!title || !description) {
    return res.status(400).json({
      msg: "bad request, not all data entered",
    });
  }
  checkCategory.title = title;
  checkCategory.description = description;
  checkCategory.image =
    req.file != undefined ? req.file.path : checkCategory.image;

  const isUpdated = await checkCategory.save();
  if (isUpdated) {
    return res.status(201).json({
      msg: "model is updated",
      data: checkCategory,
    });
  } else {
    res.status(400);
    throw new Error("bad request");
  }
});
const CategoryController = {
  getAllCategories,
  getCategory,
  deleteCategory,
  editCategory,
  addCategory,
};
export default CategoryController;
