import { NextFunction, Request, Response } from "express";
import Blog from "../model/blogPost";
import { Document } from "mongoose";

interface Post extends Document {
  name: string;
  category: string;
  createdAt: Date;
}

export const createPost = async (req: any, res: any) => {
  try {
    const name = req.body.name;
    const category = req.body.category;
    const newPost = new Blog({
      name,
      category,
    });
    const created_post = await newPost.save();
    res.status(200).json({
      createdPost: {
        id: created_post.id,
        name: created_post.name,
        category: created_post.category,
        createdAt: created_post.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const getAllPost = async (req: any, res: any, next: any) => {
  try {
    const categoryFilter = req.query.category as string;
    console.log(categoryFilter);

    const isPostExist: Post[] = await Blog.find()
      .sort({ createdAt: 1, name: 1 })
      .exec();

    if (!isPostExist) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      if (categoryFilter) {
        const filterCategoryWise = await isPostExist.filter(
          (post) => post.category === categoryFilter
        );
        console.log(filterCategoryWise);
        if (filterCategoryWise) {
          res.status(200).json(filterCategoryWise);
        } else {
          res.status(404).json({
            message: "Category wise not found",
          });
        }
      } else {
        res.status(200).json(isPostExist);
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log(id);
    const isPostExist = await Blog.findById(id);
    console.log(isPostExist);
    if (isPostExist) {
      res.status(200).json({
        getPostById: {
          id: isPostExist.id,
          name: isPostExist.name,
          category: isPostExist.category,
          createdAt: isPostExist.createdAt,
        },
      });
    } else {
      res.status(404).json({
        message: "Post Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const updatePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { name, category } = req.body;
    const isPostExist: Post | null = await Blog.findById(id);
    if (!isPostExist) {
      res.status(404).json({
        message: "Post not found",
      });
    }
    const newUpdatedPost: Post | null = await Blog.findByIdAndUpdate(
      id,
      { name, category },
      { new: true }
    );
    if (!newUpdatedPost) {
      res.status(500).json({
        message: "Post not Updated",
      });
    } else {
      res.status(200).json({
        message: "Post Updated Sucessfully",
        Post: newUpdatedPost,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const isPostExist: Post | null = await Blog.findById(id);
    if (!isPostExist) {
      res.status(404).json({
        message: "Post Not found",
      });
    } else {
      const deletePost: Post | null = await Blog.findByIdAndDelete(id);
      if (deletePost) {
        res.status(200).json({
          message: "Post deleted Successfully ",
        });
      } else {
        res.status(500).json({
          message: " Error while deleting",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
