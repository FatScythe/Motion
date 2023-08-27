import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import config, { has } from "config";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "editor" | "reader" | "admin";
  isSubscribed?: boolean;
  comparePassword(Cpwd: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [2, "Name cannot be less than two characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password character should be at least 6"],
      required: [true, "Please provide a password"],
    },
    role: {
      type: String,
      enum: ["editor", "reader", "admin"],
      default: "reader",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const user: UserDocument = this;

  const salt = await bcrypt.genSalt(config.get("saltRounds"));
  const hashedPwd = await bcrypt.hash(user.password, salt);

  user.password = hashedPwd;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user: UserDocument = this.user;
  return bcrypt.compare(candidatePassword, user.password);
};

export default model<UserDocument>("Users", userSchema);
