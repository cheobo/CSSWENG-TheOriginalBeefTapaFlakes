import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);
  
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  const updateProductInventory = asyncHandler(async (req, res) => {
    const { productId, packageId } = req.params;
    const { inventory } = req.body;

      try {
          const product = await Product.findById(productId);

          if (product) {
              const packageToUpdate = product.packages.find(productPackage => productPackage._id.toString() === packageId);

              if (packageToUpdate) {
                  packageToUpdate.countInStock = inventory;
                  await product.save();
                  res.json({ message: "Package inventory updated" });
              } else {
                  res.status(404).json({ message: "Package not found" });
              }
          } else {
              res.status(404).json({ message: "Product not found" });
          }
      } catch (error) {
          res.status(500).json({ message: "Server Error" });
      }
});

export {
    getProducts,
    getProductById,
    updateProductInventory,
};