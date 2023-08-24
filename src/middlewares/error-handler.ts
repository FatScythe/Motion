import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
const errorHandleMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(chalk.redBright("In error handler", err));

  res.status(500).json({ msg: "Something went wrong" });
};

export default errorHandleMiddleware;
