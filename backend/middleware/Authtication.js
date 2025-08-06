import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../models/user.js"
import jwt from "jsonwebtoken"


//  MiddleWare to check user is authanticated or not
export const isAuthticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    
    // 
    if (!token) {
        return next(new ErrorHandler("Login First to acces it ", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    console.log(decoded);
    

    next();
});


// middleware/Authtication.js

export const authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Role = ${req.user.role} is not allowed to access this route`, 
                403
            ));
        }
        next(); // <- important!
    };
};
