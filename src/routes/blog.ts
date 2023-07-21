import express from "express";
import {
  createPost,
  deletePostById,
  getAllPost,
  getPostById,
  updatePostById,
} from "../controller/blogPostController";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getAllPost);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePostById);
router.delete("/posts/:id", deletePostById);

export default router;
