import express from "express";
import {registerUser, loginUser, testUser, getProfile, getAllUsers, updateProfile, deleteUser} from "../controllers/usercontroller.js";
import { authMiddleWare } from "../middlewares/authmiddleware.js";
import { adminMiddleWare } from "../middlewares/adminmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test-auth", authMiddleWare, testUser);
router.get("/profile", authMiddleWare, getProfile);
router.get("/admin/users", authMiddleWare, adminMiddleWare, getAllUsers);
router.patch("/profile", authMiddleWare, updateProfile);
router.delete("/profile", authMiddleWare, deleteUser)

export default router;