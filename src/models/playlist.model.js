import mongoose, { Schema } from "mongoose";

const playlist = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
    owner: {
      type: Schema.Type.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);
