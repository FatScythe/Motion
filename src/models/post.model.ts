import { Schema, model, Document, Types } from "mongoose";

interface PostDocument extends Document {
  title: string;
  body: string;
  author: Types.ObjectId;
}

const postSchema = new Schema<PostDocument>({
  title: {
    type: String,
    required: [true, "Please provide title fot the post"],
  },
  body: {
    type: String,
    required: [true, "Please provide post contents"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Please provide an author"],
  },
});

export default model<PostDocument>("Posts", postSchema);
