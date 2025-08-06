// backend/routes/productRoutes.js

import express from 'express';
import { isAuthticated } from '../middleware/Authtication.js';
import { authorizedRole } from '../middleware/Authtication.js';
import {
    createProduct,
    getAllProducts,
    getSingleProductsDetail,
    updateProductById,
    deleteProductById,
    createProductReviews,
    getProductReviews,
    deleteProductReviews,
    
} from '../controllers/products.js';


const router = express.Router();

// Route definition

// public rout
router.get('/products', getAllProducts);

//  only admin rout
router.post("/admin/product", isAuthticated, authorizedRole("admin"), createProduct);

// public rout
router.get("/products/:id", getSingleProductsDetail);

// only admin rout
router.put("/admin/products/:id", isAuthticated, authorizedRole("admin"), updateProductById)
// only admin rout
router.delete("/admin/products/:id" , isAuthticated, authorizedRole("admin") , deleteProductById)


//

router.put("/reviews", isAuthticated, createProductReviews)
// 
router.get("/reviews", isAuthticated, getProductReviews) 

// 
router.delete("/admin/reviews" , isAuthticated,  deleteProductReviews) 


// Export router
export default router;
