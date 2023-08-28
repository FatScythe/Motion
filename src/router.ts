import express, { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "./controllers/auth.ctrl";
import { showMe } from "./controllers/user.ctrl";
import {
  authenticateUser,
  authorizePermission,
} from "./middlewares/authentication-handler";

const router = express();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", authenticateUser, logoutUser);

router.get("/user/showMe", authenticateUser, showMe);

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
