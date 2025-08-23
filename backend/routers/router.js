// backend/routes/productRoutes.js

import express from 'express';
import { isAuthticated } from '../middleware/Authtication.js';
import { authorizedRole } from '../middleware/Authtication.js';
<<<<<<< HEAD
import upload from '../utils/mutler.js';


=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
import {
    createProduct,
    getAllProducts,
    getSingleProductsDetail,
    updateProductById,
    deleteProductById,
    createProductReviews,
    getProductReviews,
    deleteProductReviews,
<<<<<<< HEAD
    canUserReview,
    getAdminProducts,
    uploadProductImages,

=======
    
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
} from '../controllers/products.js';


const router = express.Router();

// Route definition

// public rout
router.get('/products', getAllProducts);

//  only admin rout
router.post("/admin/product", isAuthticated, authorizedRole("admin"), createProduct);

<<<<<<< HEAD
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

=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
// public rout
router.get("/products/:id", getSingleProductsDetail);

// only admin rout
<<<<<<< HEAD
router.put("/admin/product/:id", isAuthticated, authorizedRole("admin"), updateProductById)
// only admin rout
router.delete("/admin/products/:id", isAuthticated, authorizedRole("admin"), deleteProductById)
=======
router.put("/admin/products/:id", isAuthticated, authorizedRole("admin"), updateProductById)
// only admin rout
router.delete("/admin/products/:id" , isAuthticated, authorizedRole("admin") , deleteProductById)
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12


//

router.put("/reviews", isAuthticated, createProductReviews)
// 
<<<<<<< HEAD
router.get("/reviews", isAuthticated, getProductReviews)

// 
router.delete("/admin/reviews", isAuthticated, deleteProductReviews)

// 
router.get("/can_review", isAuthticated, canUserReview)
=======
router.get("/reviews", isAuthticated, getProductReviews) 

// 
router.delete("/admin/reviews" , isAuthticated,  deleteProductReviews) 
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12


// Export router
export default router;
