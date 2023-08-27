import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import { CustomAPIError } from "../errors";

const errorHandleMiddleware = (
  err: CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customErr = {
    msg:
      err.message ||
      "Something went wrong, our engineeers are currently working on it",
    code: err.statusCode || 500,
  };
  console.log(chalk.redBright("In error handler", err));

  // @ts-ignore
  if (err.name === "MongoServerError" && err.code === 11000) {
    customErr.msg = "Duplicate fields";
    customErr.code = 400;
  }
  res.status(customErr.code).json({ msg: customErr.msg });
};

export default errorHandleMiddleware;
