import express from "express";
const router = express.Router();
import CategoriesController from "../Controllers/CategoriesController.js";

router
  .get("/", CategoriesController.getAllCategories)
  .post("/", CategoriesController.addCategory);

router
  .put("/:id", CategoriesController.editCategory)
  .delete("/:id", CategoriesController.deleteCategory)
  .get("/:id", CategoriesController.getCategory);

export default router;
