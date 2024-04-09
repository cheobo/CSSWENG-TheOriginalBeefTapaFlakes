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

    if (!data.bottlesPerFlavor) {
        res.json({ message: `Failed to update. Make sure to completely fill the fields` });
        return;
    }
    
    data.bottlesPerFlavor = data.bottlesPerFlavor.filter(item => item.flavor && item.quantity !== null)
    
    try {
        const product = await Product.findById(productId);
        
        const currentPackageIndex = await product.packages.findIndex(productPackage => productPackage._id.toString() === packageId);
        const existingPackageIndex = await product.packages.findIndex(productPackage => productPackage.packageOption === data.packageOption);

        
        if (product){
            if (existingPackageIndex === -1 || product.packages[currentPackageIndex]._id === product.packages[existingPackageIndex]._id) {
                product.name = data.productName;
                product.description = data.description;
                product.packages[currentPackageIndex].packageOption = data.packageOption;
                product.packages[currentPackageIndex].packageSize = data.packageSize;
                product.packages[currentPackageIndex].bottlesPerFlavor = data.bottlesPerFlavor;
                product.packages[currentPackageIndex].price = data.price;
                product.packages[currentPackageIndex].countInStock = data.inventory;
                product.ingredients = data.ingredients;
                product.nutriInfo= data.nutritionalInfo;
                
                await product.save();

                
                res.json({ message: `${product.name}: ${product.packages[currentPackageIndex].packageOption} updated.` });
            } else {
                res.status(404).json({ message: `Failed to update. ${product.packages[existingPackageIndex].packageOption} already exists on ${product.name}.` });
            }
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log(error)
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

        if (!productName || !description || !packageOption || !packageSize || !price || !inventory || !bottlesPerFlavor || !ingredients || !nutritionalInfo) {
            res.status(400).json({ message: "Failed to add. Make sure to completely fill all fields." });
            return;
        }
    
        // Check if any item in bottlesPerFlavor array has missing fields
        if (bottlesPerFlavor.some(item => !item.flavor || item.quantity === null)) {
            res.status(400).json({ message: "Failed to add. Make sure all flavors have a name and quantity." });
            return;
        }

        const filteredbottlesPerFlavor = bottlesPerFlavor.filter(item => item.flavor && item.quantity !== null)

        const appendedPackage = {
            packageOption: packageOption,
            packageSize: packageSize,
            bottlesPerFlavor: filteredbottlesPerFlavor,
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
                        res.status(201).json({ message: `Product: ${existingProduct.name} exists already. Package/Option: ${appendedPackage.packageOption} added successfully`, product: existingProduct });
                    } else {
                        res.status(400).json({ message: `Failed to add. Product: ${existingProduct.name} and Package/Option: ${appendedPackage.packageOption} exists already.`});
                    }
            } else {
                const newProduct = new Product({
                    name: productName,
                    description: description,
                    packages: [appendedPackage], // Wrap the new package in an array
                    ingredients: ingredients,
                    nutriInfo: nutritionalInfo,
                });

                // Save the new product to the database
                await newProduct.save();
            
                // Return success response
                res.status(201).json({ message: `Product: ${newProduct.name} and Package/Option: ${appendedPackage.packageOption} added successfully.`, product: newProduct });
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
            const productName = product.name;
            let packageName = '';
            if (product) {
                const existingPackageIndex = await product.packages.findIndex(productPackage => productPackage._id.toString() === packageId);
                packageName = product.packages[existingPackageIndex].packageOption;
                if (existingPackageIndex !== -1) {
                    product.packages.splice(existingPackageIndex, 1); // Remove the package at existingPackageIndex
                    await product.save(); // Save the updated product
                    if (product.packages.length < 1) {
                        await product.deleteOne({ _id: productId})
                    }
                    console.log(product.packages)
                    res.status(200).json({ message: `Product: ${productName} and Package/Option: ${packageName} deleted successfully`});
                } else {
                    res.status(404).json({ message: `Package/Option: ${packageName} in Product: ${product.name} does not exist`})
                }
                
            } else {
                res.status(404).json({ message: `Product: ${productName}  does not exist`})
            }
        } catch (error) {
            res.status(500).json({error: 'Error removing product:'});
            console.log(error)
        }
    });



export {
    getProducts,
    getProductById,
    updateProduct,
    addProduct,
    removeProduct,
};