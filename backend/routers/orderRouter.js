import express from "express";
import { authorizedRole, isAuthticated } from '../middleware/Authtication.js'
import { adminDeleteOrder, adminOrders, getOrderDetail, myOrders, newOrder, updateOrders } from "../controllers/orderController.js";
const orderRouter = express.Router();
//

orderRouter.post("/order/new", isAuthticated, newOrder);
orderRouter.get("/order/:id", isAuthticated, getOrderDetail);
orderRouter.get("/me/orders", isAuthticated, myOrders);
// 
orderRouter.get("/admin/orders", isAuthticated, authorizedRole("admin"), adminOrders);
// 
orderRouter.put("/admin/orders/:id", isAuthticated,authorizedRole("admin"), updateOrders);
orderRouter.delete("/admin/order/:id", isAuthticated,authorizedRole("admin"), adminDeleteOrder);

// 
export default orderRouter;