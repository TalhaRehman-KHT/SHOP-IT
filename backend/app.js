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

import paymentRouter from './routers/paymentRouter.js';



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

    origin: "http://localhost:5173", // this origin works correctly 

    origin: "http://localhost:5173",

    credentials: true
}));

// Middleware

app.use(express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

app.use(express.json());

app.use(cookieParser());



// Database
connectDatabase();

// API Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRouter);
app.use('/api/v1', orderRouter);

app.use('/api/v1', paymentRouter);


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
