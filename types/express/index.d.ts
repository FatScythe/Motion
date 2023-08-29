import { IUser } from "../../src/models/user.model";
import { Request } from "express";

declare module "express" {
  interface Request {
    user?: Pick<IUser, "name" | "email" | "_id" | "role" | "isSubscribed">;
  }
}
