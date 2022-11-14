import mongoose from "mongoose";
// import pkg from "mongoose";
// import { RedIntegerFormat } from "three";
// const { Schema, mongoose } = pkg;
const CategoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5000,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Caterogy = mongoose.model("Category", CategoriesSchema);
export default Caterogy;
// module.exports = Costumer;
