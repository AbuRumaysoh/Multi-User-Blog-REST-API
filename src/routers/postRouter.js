import express from "express";

import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  adminDeletePost,
  deletePost,
} from "../controllers/postcontroller.js";
import { authMiddleWare } from "../middlewares/authmiddleware.js";
import { adminMiddleWare } from "../middlewares/adminMiddleWare.js";
import upload from "../middlewares/uploadmiddleware.js";

const router = express.Router();

// Public routes
router.get("/posts", getAllPosts);
router.get("/posts/:id", getSinglePost);

// Protected routes
router.post("/posts", authMiddleWare, upload.single("image"), createPost);
router.patch("/posts/:id", authMiddleWare, upload.single("image"), updatePost);
router.delete("/admin/posts/:id", authMiddleWare, adminMiddleWare, adminDeletePost);
router.delete("/posts/:id", authMiddleWare, deletePost);

export default router;