import jwt from "jsonwebtoken";
import config from "config";
import { Response } from "express";
import { IUser } from "../models/user.model";

const createJWT = (payload: object) => {
  return jwt.sign(payload, config.get("JWT"));
};

export const isTokenValid = (token: string) =>
  jwt.verify(token, config.get("JWT"));

export const AttachCookies = async (
  res: Response,
  user: Pick<IUser, "name" | "role" | "email" | "isSubscribed" | "_id">,
  refreshToken: string
) => {
  const accessTokenJWT = createJWT(user);
  const refreshTokenJWT = createJWT({ user, refreshToken });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("accessToken", accessTokenJWT, {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
    signed: true,
  });
};
