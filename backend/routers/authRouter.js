// 
import express from "express"
import { adminDeleteUser, adminGetUserDetail, adminGetUsers, forgotPassword, getUserProfile, loginUser, logOut, registerUser, resetPassword, updatePassword, updateProfile, updateUserByAdmin, uploadAvatar } from "../controllers/authController.js";

import { authorizedRole, isAuthticated } from "../middleware/Authtication.js";

// 
const authRouter = express.Router();

// 
authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/logout", logOut)
authRouter.post("/password/forgot", forgotPassword)
//authRouter.put("/reset/password/:token", forgotPassword)
// authRouter.put('/password/reset/:token', resetPassword);
authRouter.put('/password/reset/:token', resetPassword);

// get user profile /me 
authRouter.get("/me", isAuthticated, getUserProfile)

// update me profile 
authRouter.put("/me/update", isAuthticated, updateProfile)

// update password
authRouter.put("/password/update", isAuthticated, updatePassword)

authRouter.put("/me/upload_avatar", isAuthticated, uploadAvatar)

// admin getting all users 
authRouter.get("/admin/users", isAuthticated, authorizedRole("admin"), adminGetUsers);
// 
authRouter.get("/admin/user/:id", isAuthticated, authorizedRole("admin"), adminGetUserDetail)
// 
authRouter.put("/admin/user/:id", isAuthticated, authorizedRole("admin"), updateUserByAdmin)
authRouter.delete("/admin/user/:id", isAuthticated, authorizedRole("admin"), adminDeleteUser)





// 
export default authRouter;