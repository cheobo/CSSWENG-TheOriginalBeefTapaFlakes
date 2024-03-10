import mongoose, { Schema } from "mongoose";

const reviewSchema = mongoose.Schema(
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

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: Schema.Types.ObjectId,
    },

    description: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],

    avgRating: {
      type: mongoose.Types.Decimal128,
      required: true,
      default: 0.0
    },

    countReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: [mongoose.Types.Decimal128],
      required: true,
      default: 0.0,
    },

    package: {
      type: [String],
      required: true,
    },

    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    
    ingredients: {
        type: String,
        required: true,
    },
    
    nutriInfo: {
        type: String,
        required: true,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;