import express, { Request, Response } from "express";

const router = express();

router.post("/register", async (req: Request, res: Response) => {
  res.send("Register User");
});

router.post("/login", async (req: Request, res: Response) => {
  res.send("Login User");
});

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
