import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const sampleProducts = products.map((product) => {
      return {...product};
    });

    const sampleUsers = users.map((user) => {
      return {...user};
    })

    await Product.insertMany(sampleProducts);
    await User.insertMany(sampleUsers);

    const name = "Nathan";
    const email = "nathan@gmail.com";
    const password = "123";

    const user = new User({name: name, email: email, password: password});
    await user.save();

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