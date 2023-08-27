import { Schema, model, Document, Types } from "mongoose";

export interface sessionDocument extends Document {
  refreshToken: string;
  ip: string;
  valid: boolean;
  userAgent: string;
  user: Types.ObjectId;
}

const sessionSchema = new Schema<sessionDocument>(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

export default model<sessionDocument>("Sessions", sessionSchema);
