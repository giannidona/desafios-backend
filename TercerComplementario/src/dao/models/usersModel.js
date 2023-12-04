import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["standard", "premium"],
    default: "standard",
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
