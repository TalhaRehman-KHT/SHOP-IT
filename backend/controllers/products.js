// import { error } from "console";

import Product from "../models/produts.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFilters from "../utils/apiFilters.js";

// Get All Products  =>  GET /api/v1/products
export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const reqPerPage = 4;

<<<<<<< HEAD
=======
  //  console.log("Received query:", req.query);
  console.log("Incoming Query String:", req.query);


>>>>>>> 4354a02 (Updated shopit  add clientSide and integrate)
  // Step 1: Search + Filter
  const apiFilters = new ApiFilters(Product.find(), req.query)
    .search()
    .filter();

  // Step 2: Clone the query to get filtered results before pagination
  const productsBeforePagination = await apiFilters.query.clone();
  const filterProductsCount = productsBeforePagination.length;

  // Step 3: Apply Pagination
  apiFilters.pagination(reqPerPage);
  const products = await apiFilters.query; // Now safe to execute

  // Step 4: Return response
  if (!products || products.length === 0) {
    return next(new ErrorHandler("No products found", 404));
  }

  res.status(200).json({
    success: true,
    reqPerPage,
<<<<<<< HEAD
=======
    resPerPage: reqPerPage,
>>>>>>> 4354a02 (Updated shopit  add clientSide and integrate)
    filterProductsCount,
    products,
  });

  console.log(`Getting All Products = ${products}`);
});



export const createProduct = catchAsyncError(async (req, res, next) => {
  try {
<<<<<<< HEAD
    req.body.user = req.user_id;
=======
    // req.body.user = req.user_id;
    req.body.user = req.user._id;
>>>>>>> 4354a02 (Updated shopit  add clientSide and integrate)
    const product = await Product.create(req.body);

    console.log("New Product Created:", product);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
}
);
// 
// Get Single Product Detail  =>  GET /api/v1/products/:id
export const getSingleProductsDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


// Update Product by ID => PUT /api/v1/products/:id
export const updateProductById = catchAsyncError(async (req, res, next) => {
  console.log("Update Request Received for Product ID:", req?.params?.id);
  console.log("Update Data:", req.body);

  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
    runValidators: true,
  })

  console.log("Product successfully updated:", product);

  res.status(200).json({
    success: true,
    product,
  });
});


// delate by id path /api/v1/products/:id

// Delete Product by ID => DELETE /api/v1/products/:id
export const deleteProductById = catchAsyncError(async (req, res, next) => {
  const productId = req?.params?.id;
  console.log("Delete Request Received for Product ID:", productId);

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  console.log("Product successfully deleted:", product);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});


// Create/Update Product Reviews =>  /api/v1/reviews
export const createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.comment = comment;
        r.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;

  // Recalculate average rating
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: isReviewed ? "Review updated successfully" : "Review added successfully",
  });
});


// Get product Reviews ==> /api/v1/reviews
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler(`Product not found`, 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Reviews => /api/v1/admin/reviews
export const deleteProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review.user.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

<<<<<<< HEAD
  
  const rating = numOfReviews === 0 
    ? 0 
=======

  const rating = numOfReviews === 0
    ? 0
>>>>>>> 4354a02 (Updated shopit  add clientSide and integrate)
    : reviews.reduce((acc, item) => acc + item.rating, 0) / numOfReviews;

  product.reviews = reviews;
  product.numOfReviews = numOfReviews;
  product.rating = rating;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});


