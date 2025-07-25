import catchAsyncError from "../middleware/catchAsyncError.js";
import crypto from "crypto"
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from "../utils/setToken.js"
import sendEmail from "../utils/sendEmail.js";


//  registerUser path /api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    // remove password before sending response
    user.password = undefined;

    // Send token in cookie
    sendToken(user, 201, res);
});



//  loginUser path /api/v1/login
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    // Find user and explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Compare passwords
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Generate JWT token
    // const token = user.getJwtToken();

    // Optional: exclude password in response
    user.password = undefined;

    // Send token in cookie
    sendToken(user, 200, res);
});


// Logout path: /api/v1/logout
export const logOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        message: "Logged Out",
    });
});


// Forgot Password route: /api/v1/forgot/password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
  
    // Validate email field
    if (!email) {
      return next(new ErrorHandler("Please provide your email address", 400));
    }
  
    // Find the user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Generate reset token
    const resetToken = user.getResetPasswordToken();
  
    // Save the token and expiry to the user model
    await user.save({ validateBeforeSave: false });
  
    // Create reset password URL
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  
    // Generate HTML email content
    const message = getResetPasswordTemplate(user.name, resetUrl);
  
    try {
      await sendEmail({
        email: user.email,
        subject: "ShopIT Password Recovery",
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler("Email could not be sent. Try again later.", 500));
    }
  });
  



// Reset Password route: /api/v1/reset/:token
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  // Validate input fields
  if (!password || !confirmPassword) {
    return next(new ErrorHandler("Please enter both password fields", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Hash the token from URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find user by token and check if token is not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset token is invalid or has expired", 400));
  }

  // Set new password and clear reset fields
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Save user with updated password
  await user.save();

  // Optionally send token (login user after reset)
  sendToken(user, 200, res);
});


// Get Current User Profile  ==> /api/v1/me
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({
    success: true,
    user,
  });
});


// Update Password   ==> /api/v1/password/update
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Check the old password
  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  // Set new password
  user.password = req.body.password;

  // Save user
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});



// Update User profile    ==> /api/v1/me/update
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email, 
  };
  
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    // runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
    message : "succesfuly Updated user Profile"
  });
});


// Get all users - ADMIN    ==> /api/v1/admin/users
export const adminGetUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
    message: "Successfully fetched all users by admin"
  });
});

// Get single user detail - ADMIN    ==> /api/v1/admin/user/:id
export const adminGetUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user,
    message: "Successfully fetched user details by admin"
  });
});


// Update User by Admin ==> /api/v1/admin/user/:id
export const updateUserByAdmin = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    // runValidators: true, 
  });

  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user,
    message: "Successfully updated user profile",
  });
});


// Delete User by Admin ==> /api/v1/admin/user/:id
export const adminDeleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
  }

  await user.deleteOne(); 

  res.status(200).json({
    success: true,
    message: "User deleted successfully by admin",
  });
});
