import mongoose from "mongoose";
import Product from "../models/produts.js";
import products from './data.js'

const seederProducts = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shopit-v2");

        await Product.deleteMany();
        console.log(`All Products Deleted`);

        await Product.insertMany(products);
        console.log(`Inseted All products`);

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}  

seederProducts();