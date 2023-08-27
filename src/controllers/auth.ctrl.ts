import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/user.model";
import Session from "../models/session.model";
import crypto from "crypto";
import { AttachCookies } from "../utils/cookies";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "reader" : "admin";

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

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials!!!");
  }

  let refreshToken = crypto.randomBytes(40).toString("hex");
  let ip = req.ip;
  let userAgent = req.get("user-agent");

  await Session.create({
    refreshToken,
    ip,
    userAgent,
    user: user._id,
  });

  const tokenUser = {
    name: user.name,
    email: user.email,
    _id: user._id,
    role: user.role,
    isSubscribed: user.isSubscribed,
  };

  AttachCookies(res, tokenUser, refreshToken);

  res.status(200).json({ msg: "Login sucessfully" });
};

export { registerUser, loginUser };
