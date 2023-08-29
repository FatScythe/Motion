import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError, Unauthorized } from "../errors";
import Session from "../models/session.model";
import { isTokenValid, AttachCookies } from "../utils/cookies";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      // @ts-ignore
      req.user = payload;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    // @ts-ignore
    const existingToken = await Session.findOne({
      // @ts-ignore
      user: payload.user._id,
      // @ts-ignore
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken.valid) {
      throw new UnauthenticatedError(
        "Unauthorized to access resources on this path"
      );
    }
    // @ts-ignore
    req.user = payload.user;
    // @ts-ignore
    AttachCookies(res, payload.user, existingToken.refreshToken);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

type role = "reader" | "author" | "admin";
const authorizePermission = (...roles: role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized("Unauthorized to access resources on this path");
    }
    next();
  };
};

export { authenticateUser, authorizePermission };
