import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    model: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Model",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      requried: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      requried: true,
      default: 0,
    },
    price: {
      type: Number,
      requried: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      requried: true,
      default: 0,
    },
    onSale: {
      type: Boolean,
      required:true,
      default:false,
    },
    salePrice: {
      type: Number,
      required:true,
      default:0,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
