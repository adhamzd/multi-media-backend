import express from "express";
const router = express.Router();
import ModelController from "../Controllers/ModelController.js";

router
  .get("/", ModelController.getAllModels)
  .post("/", ModelController.addModel);

router
  .get("/:id", ModelController.getModel)
  .put("/:id", ModelController.editModel)
  .delete("/:id", ModelController.deleteModel);

export default router;
// module.exports = router;
