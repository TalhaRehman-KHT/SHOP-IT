// backend/routes/productRoutes.js

import express from 'express';
import { isAuthticated } from '../middleware/Authtication.js';
import { authorizedRole } from '../middleware/Authtication.js';
import upload from '../utils/mutler.js';


import {
    createProduct,
    getAllProducts,
    getSingleProductsDetail,
    updateProductById,
    deleteProductById,
    createProductReviews,
    getProductReviews,
    deleteProductReviews,
    canUserReview,
    getAdminProducts,
    uploadProductImages,

} from '../controllers/products.js';


const router = express.Router();

// Route definition

// public rout
router.get('/products', getAllProducts);

//  only admin rout
router.post("/admin/product", isAuthticated, authorizedRole("admin"), createProduct);

// 
// routes/adminRoutes.js
router.put(
    "/admin/product/:id/upload_images",
    isAuthticated,
    authorizedRole("admin"),
    upload.array("images"),   // ✅ must match frontend FormData
    uploadProductImages
);



//  only admin rout
router.get("/admin/products", isAuthticated, authorizedRole("admin"), getAdminProducts);

// public rout
router.get("/products/:id", getSingleProductsDetail);

// only admin rout
router.put("/admin/product/:id", isAuthticated, authorizedRole("admin"), updateProductById)
// only admin rout
router.delete("/admin/products/:id", isAuthticated, authorizedRole("admin"), deleteProductById)


//

router.put("/reviews", isAuthticated, createProductReviews)
// 
router.get("/reviews", isAuthticated, getProductReviews)

// 
router.delete("/admin/reviews", isAuthticated, deleteProductReviews)

// 
router.get("/can_review", isAuthticated, canUserReview)


// Export router
export default router;
