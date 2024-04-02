import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: null },
    phone: { type: String, default: null },
    provider: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    favorites: { type: Array },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
export default User;
