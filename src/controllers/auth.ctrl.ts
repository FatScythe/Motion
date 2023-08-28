import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import User from "../models/user.model";
import Session from "../models/session.model";
import crypto from "crypto";
import { AttachCookies } from "../utils/cookies";
import createTokenUser from "../utils/createTokenUser";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "reader";

  await User.create({ name, email, password, role });

  res.status(201).json({ msg: "Account created" });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please fill all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials!!!");
  }

  let refreshToken = "";

  const existingToken = await Session.findOne({ user: user._id });

  if (existingToken) {
    const { valid } = existingToken;
    if (!valid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    refreshToken = existingToken.refreshToken;

    AttachCookies(res, tokenUser, refreshToken);

    return res.status(200).json({ msg: "Login sucessfully" });
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  let ip = req.ip;
  let userAgent = req.get("user-agent");

  await Session.create({
    refreshToken,
    ip,
    userAgent,
    user: user._id,
  });

  AttachCookies(res, tokenUser, refreshToken);

  res.status(200).json({ msg: "Login sucessfully" });
};

const logoutUser = async (req: Request, res: Response) => {
  // @ts-ignore
  await Session.findOneAndDelete({ user: req.user._id });

  res.cookie("accessToken", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ msg: "User have been logged out" });
};

export { registerUser, loginUser, logoutUser };
