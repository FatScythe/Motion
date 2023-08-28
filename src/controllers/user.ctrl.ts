import { Request, Response } from "express";

export const showMe = async (req: Request, res: Response) => {
  // @ts-ignore
  res.status(200).json(req.user);
};
