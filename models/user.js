
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    otp: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;