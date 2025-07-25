import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter user name"],
    maxLength: [50, "User name cannot exceed 50 characters"], 
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [6, "Password must be at least 6 characters"], 
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String, 
  resetPasswordExpire: Date,
}, { timestamps: true });

// Bcrypt passwords before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token and store in DB
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expiration (15 minutes from now)
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // Return unhashed token for email
  return resetToken;
};

export default mongoose.model("User", userSchema);
