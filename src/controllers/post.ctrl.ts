import { Request, Response } from "express";
import Post from "../models/post.model";
import { BadRequestError, NotFoundError } from "../errors";
import checkPermission from "../utils/check.permission";
import User from "../models/user.model";

export const getAllPost = async (req: Request, res: Response) => {
  const posts = await Post.find({});
  const count = await Post.countDocuments({});

  res.status(200).json({ nbPosts: count, posts });
};

export const getSinglePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id }).populate({
    path: "author",
    select: "name",
  });

  res.status(200).json({ post });
};

export const addPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  if (!title || !body) {
    throw new BadRequestError("Please fill all fields");
  }

  const user = await User.findOne({ _id: req.user?._id });

  if (user?.role && user.role == "reader") {
    user.role = "editor";
    await user.save();
  }

  await Post.create({ title, body, author: user?._id });

  res.status(201).json({ msg: "Created new post" });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  if (!post) {
    throw new NotFoundError(`No post with id: ${id}`);
  }
  checkPermission(post, req);
  await Post.deleteOne({ _id: post._id });

  res.status(200).json({ msg: "Post has been deleted" });
};

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  const { title, body } = req.body;
  if (!title || !body) {
    throw new BadRequestError("Please fill all fields");
  }

  if (!post) {
    throw new NotFoundError(`No post with id: ${id}`);
  }
  if (req.user) checkPermission(post, req);

  await Post.updateOne(
    { _id: id },
    { title, body },
    { runValidators: true, new: true }
  );

  res.status(200).json({ msg: "Post has been editted" });
};
