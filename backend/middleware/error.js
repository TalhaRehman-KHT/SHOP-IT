// middleware error handler

import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };
    // Handle invalid mangooese 
    if (err.name === "CastError") {
        const message = `Resouece not found.  Invalid  ${err?.path}`
        err = new ErrorHandler(message, 404);
    }
    // handle invalid validators
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message);
        err = new ErrorHandler(message, 400);
    }


// handle dublicate email 
if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} entered. `;
    error= new ErrorHandler(message , 400)
     
    }
    
  
// Handle JWT token error
if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please try again!";
    err = new ErrorHandler(message, 400);
  }
  
  


    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
        res.status(error.statusCode).json({
            message: error.message
        });
    }

    // res.status(error.statusCode).json({
    //     message: error.message
    // });
};
