import express, { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "./controllers/auth.ctrl";
import { showMe } from "./controllers/user.ctrl";
import {
  authenticateUser,
  authorizePermission,
} from "./middlewares/authentication-handler";
import {
  addPost,
  getAllPost,
  getSinglePost,
  editPost,
  deletePost,
} from "./controllers/post.ctrl";

const router = express();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", authenticateUser, logoutUser);

router.get("/user/showMe", authenticateUser, showMe);

router.route("/post").get(getAllPost).post(addPost);

router
  .route("/post/:id")
  .get(getSinglePost)
  .post(authenticateUser, addPost)
  .patch([authenticateUser, authorizePermission("admin", "author")], editPost)
  .delete([authenticateUser, authorizePermission("admin", "author")]);

export default router;
