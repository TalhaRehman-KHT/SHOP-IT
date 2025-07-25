import catchAsyncError from "../middleware/catchAsyncError.js";
import crypto from "crypto"
import Order from "../models/order.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from "../utils/setToken.js"
import sendEmail from "../utils/sendEmail.js";
import Product from "../models/produts.js";



//  Create New Order ==> /api/v1/order/new
export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentInfo,
    paymentMethod,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentInfo,
    paymentMethod,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order Detail ==> GET /api/v1/orders/:id
export const getOrderDetail = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(`Order not found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Current User's Orders ==> GET /api/v1/me/orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate("user" , " name email");

  res.status(200).json({
    success: true,
    orders,
  });
});


// Get All Orders - ADMIN  ==> GET /api/v1/admin/orders
export const adminOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    orders,
    message:"Admin Getting All Orders"
  });
});



// Update Order Status - ADMIN  ==> PUT /api/v1/admin/orders/:id
export const updateOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`Order not found with id: ${req.params.id}`, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is already delivered", 400));
  }

  // Reduce product stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product.toString());

    if (!product) {
      return next(new ErrorHandler(`Product not found with id: ${item.product}`, 404));
    }

    product.stock -= item.quantity;
    await product.save();
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

// 

// Delete Order by Admin ==> DELETE /api/v1/admin/order/:id
export const adminDeleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id); // Fixed: should be 'order', not 'orders'

  if (!order) {
    return next(new ErrorHandler(`Order not found with id: ${req.params.id}`, 404));
  }

  await order.deleteOne(); 

  res.status(200).json({
    success: true,
    message: "Order successfully deleted"
  });
});
