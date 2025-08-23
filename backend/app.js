import express from 'express';
import productRoutes from './routers/router.js';
import authRouter from './routers/authRouter.js'
import orderRouter from './routers/orderRouter.js';
import connectDatabase from './config/dbConnection.js';
import errorMiddleware from "./middleware/error.js"
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
<<<<<<< HEAD
import paymentRouter from './routers/paymentRouter.js';
=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12


// handle uncaught exception 
process.on("uncaughtException", (err) => {
    console.log(`Error = ${err}`)
    console.log(`Shutting down server due to un caught exceptions`);
    process.exit(1);
})


//  for  dot env database an other connection 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// c0nfig path for connection 
dotenv.config({ path: path.join(__dirname, "config/config.env") });






const app = express();
const PORT = process.env.PORT || 3000;

// Add this middleware before routes
app.use(cors({
<<<<<<< HEAD
    origin: "http://localhost:5173", // this origin works correctly 
=======
    origin: "http://localhost:5173",
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
    credentials: true
}));

// Middleware
<<<<<<< HEAD
app.use(express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));
=======
app.use(express.json());
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
app.use(cookieParser());



// Database
connectDatabase();

// API Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRouter);
app.use('/api/v1', orderRouter);
<<<<<<< HEAD
app.use('/api/v1', paymentRouter);
=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

// ErrorMiddleware
app.use(errorMiddleware)

const server = app.listen(PORT, () => {
    console.log(`✅ Server Running at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error = ${err}`);
    console.log(`Shutting down server due to Unhandle rejection`);
    server.close(() => {
        process.exit(1);
    })
})
