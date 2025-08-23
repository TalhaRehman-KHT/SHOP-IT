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
<<<<<<< HEAD
  const orders = await Order.find({ user: req.user._id }).populate("user", " name email");
=======
  const orders = await Order.find({ user: req.user._id }).populate("user" , " name email");
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

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
<<<<<<< HEAD
    message: "Admin Getting All Orders"
=======
    message:"Admin Getting All Orders"
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
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

<<<<<<< HEAD
  await order.deleteOne();
=======
  await order.deleteOne(); 
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

  res.status(200).json({
    success: true,
    message: "Order successfully deleted"
  });
});
<<<<<<< HEAD

// 
// 
// 

// helper function to fetch sales data
async function getSalesData(startDate, endDate) {
  const salesData = await Order.aggregate([
    {
      // stage 1: filter results
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      // stage 2: group by formatted date
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalSales: { $sum: "$totalAmount" }, // ✅ must prefix with $
        numOrders: { $sum: 1 }, // ✅ count orders
      },
    },
    {
      // optional: sort by date
      $sort: { _id: 1 },
    },
  ]);

  // convert to Map (optional)
  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;

  salesData.forEach((entry) => {
    const date = entry._id; // already a string like "2025-08-16"
    const sales = entry.totalSales;
    const numOrders = entry.numOrders;

    salesMap.set(date, { sales, numOrders });

    totalSales += sales;
    totalNumOrders += numOrders;
  });

  return { salesMap, totalSales, totalNumOrders, salesData };
}

// generate an array of dates between start and end
function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0]; // ✅ YYYY-MM-DD
    dates.push(formattedDate);

    // move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

// Controller: /api/v1/admin/getsale
export const getSales = catchAsyncError(async (req, res, next) => {
  const startDate = new Date(req?.query.startDate);
  const endDate = new Date(req?.query.endDate);

  // normalize time range
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const { salesMap, totalSales, totalNumOrders, salesData } =
    await getSalesData(startDate, endDate);

  res.status(200).json({
    success: true,
    totalSales,
    totalNumOrders,
    salesByDate: salesData, // grouped sales per day
    allDates: getDatesBetween(startDate, endDate), // useful for chart
  });
});
=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
