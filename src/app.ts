require("dotenv").config();
require("express-async-errors");
import express, { Express, Request, Response } from "express";
import chalk from "chalk";
import config from "config";
// Routes
import router from "./router";
// DB
import connectDB from "./db/connectDB";
// Middlewares
import errorHandleMiddleware from "./middlewares/error-handler";
// Cookies
import cookieParser from "cookie-parser";

const port = config.get("port") as number;

const app: Express = express();

app.use(cookieParser(config.get("JWT")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).send({ msg: "Hello dunya" });
});

app.use(errorHandleMiddleware);

app.listen(port, () => {
  connectDB();
  console.log(chalk.yellow(`App is listening on port ${port}`));
});
