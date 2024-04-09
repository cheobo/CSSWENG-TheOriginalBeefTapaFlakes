import express from "express";
import multer from "multer";
import path from "path";
import Product from "../models/productModel.js";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const router = express.Router();

const ensureUploadsDirectoryExists = () => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
};

// Ensure that the uploads directory exists
ensureUploadsDirectoryExists();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueId = uuidv4();
      cb(null, uniqueId + path.extname(file.originalname)); // Custom filename for uploaded file
    }
  });

  const upload = multer({ storage: storage });

  router.put('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(new ObjectId(req.params.productId));
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        } 


        if (!product.image && !product.uniqueId){
            upload.single('file')(req, res, async (err) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                // Update the product picture location and unique identifier
                const uniqueId = uuidv4();
                product.image = req.file.path;
                product.imageId = uniqueId;
                await product.save();
        
                res.json({
                    message: "Image Uploaded",
                    image: `/${req.file.path}`,
                });
            });
        } else {
            fs.unlinkSync(product.image); // Delete old image from the uploads folder
            // Update the product picture location and unique identifier
            upload.single('file')(req, res, async (err) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                // Update the product picture location and unique identifier
                const uniqueId = uuidv4();
                product.image = req.file.path;
                product.imageId = uniqueId;
                await product.save();
        
                res.json({
                    message: "Image Changed",
                    image: `/${req.file.path}`,
                });
            });
        }
        
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;