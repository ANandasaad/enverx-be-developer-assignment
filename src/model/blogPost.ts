import mongoose from "mongoose";

interface blog {
  name: string;
  category: string;
  createdAt: Date;
}

const blogSchema = new mongoose.Schema<blog>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<blog>("Blog", blogSchema);

export default Blog;
