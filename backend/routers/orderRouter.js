import express from "express";
import { authorizedRole, isAuthticated } from '../middleware/Authtication.js'
<<<<<<< HEAD
import { adminDeleteOrder, adminOrders, getOrderDetail, getSales, myOrders, newOrder, updateOrders } from "../controllers/orderController.js";
=======
import { adminDeleteOrder, adminOrders, getOrderDetail, myOrders, newOrder, updateOrders } from "../controllers/orderController.js";
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
const orderRouter = express.Router();
//

orderRouter.post("/order/new", isAuthticated, newOrder);
orderRouter.get("/order/:id", isAuthticated, getOrderDetail);
orderRouter.get("/me/orders", isAuthticated, myOrders);
// 
orderRouter.get("/admin/orders", isAuthticated, authorizedRole("admin"), adminOrders);
// 
<<<<<<< HEAD
orderRouter.get("/admin/get_sales", isAuthticated, authorizedRole("admin"), getSales);
// 
orderRouter.put("/admin/orders/:id", isAuthticated, authorizedRole("admin"), updateOrders);
orderRouter.delete("/admin/order/:id", isAuthticated, authorizedRole("admin"), adminDeleteOrder);
=======
orderRouter.put("/admin/orders/:id", isAuthticated,authorizedRole("admin"), updateOrders);
orderRouter.delete("/admin/order/:id", isAuthticated,authorizedRole("admin"), adminDeleteOrder);
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

// 
export default orderRouter;