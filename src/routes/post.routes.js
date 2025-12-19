import express from "express";
import { body, param, query } from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createPost,
  getPosts,
  likePost,
  getPostsByUser,
} from "../controllers/post.controller.js";

const router = express.Router();

//Create Post
router.post(
  "/",
  authMiddleware,
  [body("caption").notEmpty().withMessage("Caption is required")],
  createPost
);

// Get posts
router.get(
  "/",
  [
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive number"),
    query("skip")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Skip must be 0 or greater"),
  ],
  getPosts
);

// Like a Post
router.post(
  "/:id/like",
  authMiddleware,
  [param("id").isMongoId().withMessage("Invalid post ID")],
  likePost
);

// Get Posts by User
router.get(
  "/user/:userId",
  [param("userId").isMongoId().withMessage("Invalid user ID")],
  getPostsByUser
);

export default router;
