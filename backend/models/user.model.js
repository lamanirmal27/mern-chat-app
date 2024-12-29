import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ["local", "google"],
    default: "local",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    required: function () {
      return this.provider === "local";
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
    default: "male",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  googleId: String,
  email: String,
  displayName: String,
  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
