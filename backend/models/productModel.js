import mongoose from "mongoose";

const packageSchema = mongoose.Schema({
  packageOption: {
    type: String,
    required: true
  },

  packageSize: {
    type: Number, // Assuming the size is in grams or milliliters
    required: true
  },

  bottlesPerFlavor: [{
    flavor: {
      type: String,
      required: true
    },

  quantity: {
      type: Number,
      required: true
    },
  }],

  price: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0.0,
  },
});

// Define a virtual field for totalBottles
packageSchema.virtual('totalBottles').get(function() {
  // Sum the quantities of all flavors
  return this.bottlesPerFlavor.reduce((total, flavor) => total + flavor.quantity, 0);
});

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
      type: String,
      required: false,
    },

    imageId: {
      type: String,
      required: false,
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

    packages: [packageSchema],

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