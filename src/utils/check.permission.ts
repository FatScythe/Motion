import { Request } from "express";
import { Unauthorized } from "../errors";
import { IPost } from "../models/post.model";

const checkPermission = (resource: IPost, request: Request) => {
  if (request.user?.role === "admin") return;
  if (resource.author.toString() === request.user?._id) return;
  throw new Unauthorized("You cannot perform this action");
};

export default checkPermission;
