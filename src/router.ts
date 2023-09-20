import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { registerUser, loginUser, logoutUser } from "./controllers/auth.ctrl";
import { showMe } from "./controllers/user.ctrl";
import {
  authenticateUser,
  authenticateVisitor,
  authorizePermission,
} from "./middlewares/authentication-handler";
import {
  addPost,
  getAllPost,
  getSinglePost,
  editPost,
  deletePost,
} from "./controllers/post.ctrl";

const router = express.Router();

type limit = {
  max: number;
  message: string;
};

const isSubscribed = async (req: Request): Promise<limit> => {
  if (req.user) {
    if (req.user.role === "admin" || req.user.isSubscribed) {
      // users that are  subscribed limited to 50req per hour
      return { max: 200, message: "Hold on a moment" };
    } else {
      // users that are not subscribed limited to 5req per hour
      return { max: 10, message: "Please subscibe to read more post" };
    }
  }

  // Non - users limited to 3req per hour
  return { max: 4, message: "Create an account to read more post" };
};

const getPostLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  max: async (request: Request, res: Response) => {
    const value = await isSubscribed(request);
    return value.max;
  },
  message: async (request: Request, res: Response) => {
    const value = await isSubscribed(request);
    return value.message;
  },
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", authenticateUser, logoutUser);

router.get("/user/showMe", authenticateUser, showMe);

router.route("/post").get(getAllPost).post(authenticateUser, addPost);

router
  .route("/post/:id")
  .get(authenticateVisitor, getPostLimiter, getSinglePost)
  .patch([authenticateUser, authorizePermission("admin", "editor")], editPost)
  .delete(
    [authenticateUser, authorizePermission("admin", "editor")],
    deletePost
  );

export default router;
