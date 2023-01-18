import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: ["name is required"] },
    firstName: { type: String, required: ["firstname is required"] },
    lastName: { type: String, required: ["lastname is required"] },
    password: { type: String, required: ["password is required"] },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("User", userSchema);
