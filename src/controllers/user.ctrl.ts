import { Request, Response } from "express";

export const showMe = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
