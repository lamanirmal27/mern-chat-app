import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const authController = {
  signup: async (req, res) => {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      const user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);

        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    } catch (error) {
      console.log("Error in signup controller: ", error.message);

      res.status(500).json({ error: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "No User found!!" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password || ""
      );

      if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic || user.profilePicture,
      });
    } catch (error) {
      console.log("Error in login controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  logout: (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json("Logged out successfully");
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }, // Google OAuth callback
  googleAuthCallback: (req, res) => {
    console.log("here good!!");

    // After successful authentication, you can store user info in session or DB

    res.redirect("/"); // Redirect to the home page or dashboard after success
  },
  // Google OAuth failure
  googleAuthFailure: (req, res) => {
    // Handle authentication failure
    res.send("Authentication failed. Please try again.");
  },
};

export default authController;
