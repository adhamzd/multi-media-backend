import mongoose from "mongoose";
const ModelSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5000,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("Model", ModelSchema);
export default Model;
// module.exports = Costumer;
