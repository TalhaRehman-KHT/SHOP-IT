// 
import express from "express"
<<<<<<< HEAD
import { adminDeleteUser, adminGetUserDetail, adminGetUsers, forgotPassword, getUserProfile, loginUser, logOut, registerUser, resetPassword, updatePassword, updateProfile, updateUserByAdmin, uploadAvatar } from "../controllers/authController.js";
=======
import { adminDeleteUser, adminGetUserDetail, adminGetUsers, forgotPassword, getUserProfile, loginUser, logOut, registerUser, resetPassword, updatePassword, updateProfile, updateUserByAdmin } from "../controllers/authController.js";
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

import { authorizedRole, isAuthticated } from "../middleware/Authtication.js";

// 
const authRouter = express.Router();

// 
authRouter.post("/register", registerUser)
<<<<<<< HEAD
authRouter.post("/login", loginUser)
authRouter.get("/logout", logOut)
authRouter.post("/password/forgot", forgotPassword)
//authRouter.put("/reset/password/:token", forgotPassword)
// authRouter.put('/password/reset/:token', resetPassword);
authRouter.put('/password/reset/:token', resetPassword);
=======
authRouter.post("/login" , loginUser)
authRouter.get("/logout" , logOut)
authRouter.post("/password/forgot" , forgotPassword)
//authRouter.put("/reset/password/:token", forgotPassword)
// authRouter.put('/password/reset/:token', resetPassword);
authRouter.put('/password/reset/:token', resetPassword); 
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

// get user profile /me 
authRouter.get("/me", isAuthticated, getUserProfile)

// update me profile 
authRouter.put("/me/update", isAuthticated, updateProfile)

// update password
authRouter.put("/password/update", isAuthticated, updatePassword)

<<<<<<< HEAD
authRouter.put("/me/upload_avatar", isAuthticated, uploadAvatar)

=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
// admin getting all users 
authRouter.get("/admin/users", isAuthticated, authorizedRole("admin"), adminGetUsers);
// 
authRouter.get("/admin/user/:id", isAuthticated, authorizedRole("admin"), adminGetUserDetail)
// 
<<<<<<< HEAD
authRouter.put("/admin/user/:id", isAuthticated, authorizedRole("admin"), updateUserByAdmin)
authRouter.delete("/admin/user/:id", isAuthticated, authorizedRole("admin"), adminDeleteUser)
=======
authRouter.put("/admin/user/:id" ,  isAuthticated , authorizedRole("admin") , updateUserByAdmin)
authRouter.delete("/admin/user/:id" ,  isAuthticated , authorizedRole("admin") , adminDeleteUser)
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12





// 
export default authRouter;