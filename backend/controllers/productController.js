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

const updateProduct = asyncHandler(async (req, res) => {
    const { productId, packageId } = req.params;
    const data = req.body;

    try {
        const product = await Product.findById(productId);
        
        const existingPackageIndex = await product.packages.findIndex(productPackage => productPackage.packageOption === data.packageOption);
        if (product){
            if (existingPackageIndex != -1) {
                console.log(product.packages[existingPackageIndex]._id)
                console.log(packageId)
                if (product.packages[existingPackageIndex]._id !== packageId) {
                    product.packages[existingPackageIndex]._id = packageId; 
                    product.packages.splice(existingPackageIndex, 0);
                }
                product.name = data.productName;
                product.description = data.description;
                product.packages[existingPackageIndex].packageOption = data.packageOption;
                product.packages[existingPackageIndex].packageSize = data.packageSize;
                product.packages[existingPackageIndex].bottlesPerFlavor = data.bottlesPerFlavor;
                product.packages[existingPackageIndex].price = data.price;
                product.packages[existingPackageIndex].countInStock = data.inventory;
                product.ingredients = data.ingredients;
                product.nutriInfo= data.nutritionalInfo;
                
                await product.save();

                
                res.json({ message: "Package on Product updated" });
            } else {
                res.status(404).json({ message: "Package on Prodcut not found" });
            }
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

const addProduct = asyncHandler(async (req, res) => {
    const {
        productName,
        description,
        packageOption,
        packageSize,
        bottlesPerFlavor,
        price,
        inventory,
        ingredients,
        nutritionalInfo,
    } = req.body;

    const appendedPackage = {
        packageOption: packageOption,
        packageSize: packageSize,
        bottlesPerFlavor: bottlesPerFlavor,
        price: price,
        countInStock: inventory
    };

    try {
        // Check if a product with the same productName already exists
        const existingProduct = await Product.findOne({ name: productName });
        let existingPackageIndex = -1;

        if (existingProduct){
                existingPackageIndex = await existingProduct.packages.findIndex(productPackage => productPackage.packageOption === packageOption);
                if (existingPackageIndex === -1) {
                    existingProduct.packages.push(appendedPackage);
                    await existingProduct.save();
                    // Return success response
                    res.status(201).json({ message: "Product exists already. Package added successfully", product: existingProduct });
                } else {
                    existingProduct.name = productName;
                    existingProduct.description = description;
                    existingProduct.packages[existingPackageIndex] = appendedPackage;
                    existingProduct.ingredients = ingredients
                    existingProduct.nutriInfo = nutritionalInfo,
                    await existingProduct.save();
                    res.status(201).json({ message: "Product and Package exists already. Values updated"});
                }
        } else {
            const newProduct = new Product({
                name: productName,
                description: description,
                packages: [appendedPackage], // Wrap the new package in an array
                ingredients: ingredients,
                nutriInfo: nutritionalInfo,
                image: null,
            });

            // Save the new product to the database
            await newProduct.save();
        
            // Return success response
            res.status(201).json({ message: "Product and Package added successfully", product: newProduct });
        }
    } catch (error) {
        // Handle any errors
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

    const removeProduct = asyncHandler(async (req, res) => {
        const { productId, packageId } = req.params;
        try {
            // Find the product
            const product = await Product.findOne({ _id: productId }); 
            if (product) {
                const existingPackageIndex = await product.packages.findIndex(productPackage => productPackage._id.toString() === packageId);
                if (existingPackageIndex !== -1) {
                    product.packages.splice(existingPackageIndex, 1); // Remove the package at existingPackageIndex
                    await product.save(); // Save the updated product
                    if (product.packages.length < 1) {
                        await product.deleteOne({ _id: productId})
                    }
                    res.status(200).json({ message: 'Package in Product deleted successfully'});
                } else {
                    res.status(404).json({ message: 'Package in Product does not exist'})
                }
                
            } else {
                res.status(404).json({ message: 'Product does not exist'})
            }
        } catch (error) {
            res.status(500).json({error: 'Error removing product:'});
        }
    });



export {
    getProducts,
    getProductById,
    updateProduct,
    addProduct,
    removeProduct,
};