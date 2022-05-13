import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
    },
    sold: {
      type: Number,
    },
    cateId: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    description: {
      type: String,
      require: true,
      maxLength: 2000,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Product", productSchema);
