import express, { Request, Response } from "express";
import { registerUser, loginUser } from "./controllers/auth.ctrl";

const router = express();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", async (req: Request, res: Response) => {
  res.send("Hello");
});

router.get("/posts", async (req: Request, res: Response) => {
  res.send("Get All post");
});

router.post("/post/:id", async (req: Request, res: Response) => {
  res.send("Get single post");
});

router.patch("/post/:id", async (req: Request, res: Response) => {
  res.send("Edit post");
});

export default router;
