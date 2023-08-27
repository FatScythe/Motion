import { Schema, model, Document, Types } from "mongoose";

export interface ISession extends Document {
  refreshToken: string;
  ip: string;
  valid: boolean;
  userAgent: string;
  user: Types.ObjectId;
}

const sessionSchema = new Schema<ISession>(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

export default model<ISession>("Sessions", sessionSchema);
