import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/DatabaseConfig/db.js";

dotenv.config();

import UserRoutes from "./src/Routes/UserRoutes.js";
import FeedbackRouter from "./src/Routes/FeedbackRoutes.js";
import CategoryRouter from "./src/Routes/CategoriesRoutes.js";
import ModelRouter from "./src/Routes/ModelRoutes.js";
import ProductRouter from "./src/Routes/ProductRoutes.js";
import OrderRouter from "./src/Routes/OrderRoutes.js";

import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

import upload from "./src/utils/multer.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("uploads"));

connectDB();

app.use("/api/feedback", FeedbackRouter);
app.use("/api/categories", upload.single("image"), CategoryRouter);
app.use("/api/models", ModelRouter);
app.use("/api/products", upload.array("image"), ProductRouter);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRouter);

app.get("/", (req, res) => {
  if (res) {
    res.send("API is healthy");
  } else {
    res.send("API is down");
  }
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`server running on port ${port}`));
