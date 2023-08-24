import { connect } from "mongoose";
import config from "config";
import chalk from "chalk";

const connectDB = () => {
  const dbUri = config.get("dbURI") as string;

  return connect(dbUri)
    .then(() => console.log(chalk.magentaBright("Connected to database")))
    .catch((err) => console.error(chalk.red("database err", err)));
};

export default connectDB;
