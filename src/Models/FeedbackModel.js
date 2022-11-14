// import { mongoose, Schema } from "mongoose";
import mongoose from "mongoose";
// import { RedIntegerFormat } from "three";
// const { Schema, mongoose } = pkg;
const FeedbackSchema = new mongoose.Schema(
  {
    // email: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   validate: (email) => {
    //     return String(email)
    //       .toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   },
    // },
    // id: {
    //   type: Number,
    //   trim: true,
    // },
    message: {
      type: String,
      required: true,
      trim: true,
      maxLength: 5000,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("feedback", FeedbackSchema);
export default Feedback;
// module.exports = Costumer;
