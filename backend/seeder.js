import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Cart from "./models/cartModel.js";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Insert sample products
    const sampleProducts = products.map((product) => ({ ...product }));
    await Product.insertMany(sampleProducts);

    // Insert sample users and their corresponding carts
    for (const userData of users) {
      // Create a new user instance
      const newUser = new User({ ...userData });
      // Create a new Cart instance for the user
      const cart = new Cart({
        user: newUser._id, // Assuming each user has a unique _id
        cartItems: [],
        totalPrice: 0,
      });

      // Save the user and their cart to the database
      await newUser.save();
    }

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};


const destroytData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroytData();
} else {
  importData();
}