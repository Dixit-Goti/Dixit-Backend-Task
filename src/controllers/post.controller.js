import Post from "../models/Post.js";
import { validationResult } from "express-validator";

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => err.msg),
    });
  }
};

export const createPost = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const { caption } = req.body;
    const post = await Post.create({
      userId: req.userId,
      caption,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

export const getPosts = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const posts = await Post.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      pagination: {
        limit,
        skip,
        count: posts.length,
      },
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export const likePost = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.likes += 1;
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      likes: post.likes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to like post",
    });
  }
};

export const getPostsByUser = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user posts",
    });
  }
};
